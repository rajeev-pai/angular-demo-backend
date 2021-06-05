// export const splitDate = (date: string) => {
//   const split = date.split('-');
//   const errorResponse = {
//     success: false,
//     message: 'Invalid date format'
//   };

//   if (split.length !== 3) {
//     return errorResponse;
//   }

//   const day = +split[0];
//   const month = +split[1];
//   const year = +split[2];

//   if (isNaN(day) || isNaN(month) || isNaN(year)) {
//     return errorResponse;
//   }

//   return {
//     success: true,
//     data: { day, month, year },
//   };
// }

// export const getUnixTimestamp = (date: string, time: string) => {

//   const timestamp = new Date('22-05-2021');
//   console.log(+'10');
// }