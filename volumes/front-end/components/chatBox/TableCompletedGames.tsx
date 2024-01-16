import Link from 'next/link';
import Tr from './Tr'



export default function TableCompletedGames(){

    return(
        <div className="bg-dark-200 rounded-2xl ">
             <div className='h-15 p-5 '>
                Completed Games
            </div>
            <table className="bg-[#26274F] w-full text-center">
                <thead>
                    <tr className='h-12'>
                        <th className='text-left pl-14 w-fit'>
                            Players
                        </th>
                        <th>
                            Result
                        </th>
                        <th>
                            Date
                        </th>
                        
                    </tr>
                </thead>
                <tbody>

                    <Tr key={1} user='yassir' enmy='matef' enmy_score={100} user_score={900} win={1} lose={0} index={0} date='neharl7ad'/>
                    <Tr key={2} user='yassir' enmy='matef' enmy_score={100} user_score={900} win={1} lose={0} index={1} date='neharl7ad'/>
                    <Tr key={3} user='yassir' enmy='matef' enmy_score={100} user_score={900} win={1} lose={0} index={2} date='neharl7ad'/>
                    <Tr key={4} user='yassir' enmy='matef' enmy_score={100} user_score={900} win={1} lose={0} index={2} date='neharl7ad'/>
            
                </tbody>
            </table>
            <div className="text-center text-sm h-12 py-3  cursor-pointer">
                <Link href="/history">
                    See all
                </Link>
            </div> 
        </div>
    );
}