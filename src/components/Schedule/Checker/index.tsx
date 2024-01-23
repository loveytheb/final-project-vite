import React from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getArtistSchedule, getUserSchedule, addSchedule, deleteSchedule} from '../../../api/artistapi';
import {getCurrentUser} from '../../../api/currentUser';
import St from './style';
import {Schedule} from '../../../types/global.d';
import alarmIcon from '../../../assets/images/alarm-icon-white.png';
import activeAlarmIcon from '../../../assets/images/alarm-icon-active-white.png';

const Checker = ({param}: string) => {
  const queryClient = useQueryClient();

  const {data: schedule} = useQuery({
    queryKey: ['schedule'],
    queryFn: getArtistSchedule,
  });
  const {data: currentUser} = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });
  const {data: userSchedule} = useQuery({
    queryKey: ['userSchedule'],
    queryFn: getUserSchedule,
  });
  const userTargetSchedule = userSchedule?.filter(el => el.userid === currentUser?.id);

  const addMutation = useMutation({
    mutationFn: addSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userSchedule']});
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userSchedule']});
    },
  });

  const targetData = schedule?.filter(el => el.artist === param);
  const scheduleChecker: {checker: number; dayString: string; day: string}[] = [];

  const weekCalculator = () => {
    const weekList = ['일', '월', '화', '수', '목', '금', '토', '일'];
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const todayString = `${year}-${month}-${day}`;

    for (let i = 0; i < 7; i++) {
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - new Date(todayString).getDay());

      const week = new Date(sunday);
      week.setDate(sunday.getDate() + i);
      const year = week.getFullYear();
      const month = ('0' + (week.getMonth() + 1)).slice(-2);
      const day = ('0' + week.getDate()).slice(-2);
      const weekDay = `${year}-${month}-${day}`;
      scheduleChecker.push({checker: i, dayString: weekList[i], day: weekDay});
    }
  };
  weekCalculator();

  const onClickIsOnHandler = (info, userid) => {
    const isOn = userTargetSchedule?.filter(el => el.scheduleId === info.id)[0];
    if (!isOn) {
      const schedule: Schedule = {
        userid: userid,
        scheduleId: info.id,
        artist: info.artist,
        title: info.title,
        date: info.date,
        place: info.place,
      };
      addMutation.mutate(schedule);
    } else if (isOn) {
      deleteMutation.mutate(info.id);
    }
  };

  return (
    <St.ScheduleDiv>
      <St.ScheduleUl>
        {scheduleChecker.map(e => {
          return (
            <St.ScheduleLi>
              <St.ScheduleDayP>{e.dayString}</St.ScheduleDayP>
              {targetData
                ?.filter((el: {date: string}) => el.date === e.day)
                .map(ele => {
                  return (
                    <St.ScheduleListDiv>
                      <St.ScheduleListSection>
                        <St.ScheduleListTimeP>{ele.place}</St.ScheduleListTimeP>
                        <St.ScheduleListTitleP>{ele.title}</St.ScheduleListTitleP>
                      </St.ScheduleListSection>
                      <St.ScheduleListImg
                        onClick={() => {
                          onClickIsOnHandler(ele, currentUser.id);
                        }}
                        src={
                          userTargetSchedule?.filter(el => el.scheduleId === ele.id)[0] ? activeAlarmIcon : alarmIcon
                        }
                      />
                    </St.ScheduleListDiv>
                  );
                })}
            </St.ScheduleLi>
          );
        })}
      </St.ScheduleUl>
    </St.ScheduleDiv>
  );
};

export default Checker;