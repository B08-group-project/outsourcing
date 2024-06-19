import supabase from "../../supabase/supabase";

export const createCourse = async (coursePlaces) => {
  // 만약 coursePlaces 배열이 비어 있다면
  if (coursePlaces.length === 0) {
    alert("코스를 등록해주시기 바랍니다.");
    return;
  }
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // course 테이블에 사용자 ID를 포함하여 코스 정보 삽입 후 결과 가져오기
  const result = await supabase.from("course").insert({ user_id: user.id }).select();

  // 각 장소(place)에 대해 코스 정보를 생성하는 함수 호출
  for (const place of coursePlaces) {
    const placesData = {
      course_id: result.data[0].id,
      address_name: place.address_name,
      id: place.id,
      phone: place.phone,
      place_name: place.place_name,
      place_url: place.place_url,
      road_address_name: place.road_address_name,
      x: place.x,
      y: place.y,
      category_group_code: place.category_group_code,
    };

    await createCoursePlaces(placesData);
    alert("저장에 성공하셨습니다");
    return result;
  }
};

const createCoursePlaces = async (placesData) => {
  try {
    const result = await supabase.from("course_places").insert({
      id: placesData.id,
      course_id: placesData.course_id,
      place_name: placesData.place_name,
      road_address_name: placesData.road_address_name,
      address_name: placesData.address_name,
      phone: placesData.phone,
      place_url: placesData.place_url,
      x: placesData.x,
      y: placesData.y,
      category_group_code: placesData.category_group_code,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
