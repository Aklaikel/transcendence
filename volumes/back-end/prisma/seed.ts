// import { PrismaClient } from '@prisma/client';

// import {users} from '../data/users';

// const prisma = new PrismaClient();


// async function main() {
//     await prisma.user.createMany({
//         data: {
//             "firstName": "Abdelhak",
//             "lastName": "Boukhari",
//             "email": "matef7@student.1337.ma",
//             "UserName": "matef7",
//             "avatar": "https://cdn.intra.42.fr/users/bb16039477517dd848df3ab42dd89347/small_olbyad.jpg",
//         }
//     });
// };



// main()
//     .catch((e) => console.error(e))
//     .finally(async () => {
//         await prisma.$disconnect();
//     });