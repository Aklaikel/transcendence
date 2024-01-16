import React from "react";

interface Props {
    user: string,
    user_score: number,
    enmy_score: number,
    date: string,
    win: number,
    lose: number,
    enmy: string,
    index: number,
}

export default function Tr ({ user, enmy, user_score, enmy_score, date, win, lose , index}: Props)
{
    return (
        <tr className={`${index % 2 ? 'bg-[#40586F]/[.4]' : 'bg-[#393A6C]/[.4]'} border-b border-[#40586F]`}>
            <td className="py-5 px-14 text-left sm:w-[300px]">
                <span className="block ">{user}({user_score})</span>
                <span>{enmy}({enmy_score})</span>
            </td>
            <td>
                <span className="block">{win}</span>
                <span>{lose}</span>
            </td>
            <td>{date}</td>
            <td></td>
        </tr>

    )
}