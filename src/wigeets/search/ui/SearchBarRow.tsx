import {Input, IconButton} from '../../../shared/ui'

export default function SearchBarRow() {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex-1">
        <Input placeholder="날씨를 확인하실 장소를 입력해 주세요" />
      </div>

      <IconButton aria-label="theme">
        <span className="text-lg">🌙</span>
      </IconButton>
      <IconButton aria-label="profile">
        <span className="text-lg">🙂</span>
      </IconButton>
    </div>
  );
}