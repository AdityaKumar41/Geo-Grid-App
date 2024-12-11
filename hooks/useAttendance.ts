// import { useMutation, useQuery } from '@tanstack/react-query';
// import { graphqlClient } from '../client/app';

// interface Attendance {
//   id: string;
//   employeeId: string;
//   timestamp: string;
//   status: 'CHECKED_IN' | 'CHECKED_OUT';
// }

// export const useAttendanceByDate = (date: string) => {
//   return useQuery(['attendance', date], async () => {
//     const query = `
//       query GetAttendanceByDate($date: DateTime!) {
//         AttendanceByDate(date: $date) {
//           id
//           employeeId
//           timestamp
//           status
//         }
//       }
//     `;
//     const response = await graphqlClient.request(query, { date });
//     return (response as any).AttendanceByDate as Attendance[];
//   });
// };

// export const useCheckIn = () => {
//   return useMutation(async (employeeId: string) => {
//     const mutation = `
//       mutation CheckIn($employeeId: ID!) {
//         checkIn(employeeId: $employeeId) {
//           id
//           checkIn {
//             id
//             timestamp
//             status
//           }
//         }
//       }
//     `;
//     return await graphqlClient.request(mutation, { employeeId });
//   });
// };

// export const useCheckOut = () => {
//   return useMutation(async (employeeId: string) => {
//     const mutation = `
//       mutation CheckOut($employeeId: ID!) {
//         checkOut(employeeId: $employeeId) {
//           id
//           checkOut {
//             id
//             timestamp
//             status
//           }
//         }
//       }
//     `;
//     return await graphqlClient.request(mutation, { employeeId });
//   });
// };