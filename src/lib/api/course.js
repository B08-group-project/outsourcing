import supabase from "../../supabase/supabase";

export const create = async (placesData) => {
  try {
    const result = await supabase.from("course_places").insert({
      id: placesData.id,
      // course_id:course_id;
      place_name: placesData.place_name,
      road_address_name: placesData.road_address_name,
      address_name: placesData.address_name,
      phone: placesData.phone,
      place_url: placesData.place_url,
      x: placesData.x,
      y: placesData.y,
      created_at: new Date(),
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  //   return result;
  //   console.log(placesData);
};

// const { error } = await supabase
//   .from('countries')
//   .insert([
//     { id: 1, name: 'Nepal' },
//     { id: 1, name: 'Vietnam' },
//   ])
