import { useState } from 'react';
import {Input, IconButton} from '../../../shared/ui'
import { searchDistricts } from '../../../shared/lib/districts/searchDistricts';
interface Props {
  onSelect: (key: string) => void
}

export default function SearchBarRow({onSelect}: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const results = query.length >= 1 ? searchDistricts(query,20) : [];
  const displayName = (key : string) => key.replaceAll("-", " ")

  return (
    <div className="relative mb-4">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        placeholder="날씨를 확인하실 장소를 입력해 주세요"
      />

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-72 overflow-auto rounded-2xl border bg-white shadow">
          {results.map((item) => (
            <button
              key={item}
              type="button"
              className="block w-full px-4 py-3 text-left text-sm hover:bg-slate-50"
              onClick={() => {
                onSelect(item);
                setQuery(displayName(item));
                setOpen(false)
              }}
            >
              {displayName(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}