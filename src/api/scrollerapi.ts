import {toast} from 'react-toastify';
import {supabase} from './supabase';

// 추가 포스트를 가져오는 함수
export const morePosts = async (pageParam, artistName) => {
  try {
    // 페이지 매개 변수를 사용하여 데이터를 가져오기
    const {data} = await supabase
      .from('posts')
      .select('*')
      .eq('artist', artistName)
      .range(pageParam.start, pageParam.end);
    console.log(data);
    // 여기서 nextCursor와 prevCursor를 반환하도록 조정
    if (data?.length === 0) {
      toast.error('마지막 페이지입니다.');
      return {data: [], nextCursor: null, prevCursor: null};
    }
    return {
      data,
      nextCursor: pageParam.end + 1,
      prevCursor: pageParam.start - 1,
    };
  } catch (error) {
    console.error('Error fetching more posts', error);
    throw error;
  }
};
