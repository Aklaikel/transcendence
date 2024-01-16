import Icon from "@/components/icon/Icon"

export default function League() {
  return (
    <div className="flex items-center bg-dark-200 p-3">
        <Icon name="aklaikel/Crystal.svg" width={120} height={120}/>
        <div className="ml-5">
        <div className="font-bold">Crystal</div>
        <div className="font-bold">Players: 36000</div>
        </div>
    </div>
    )
}