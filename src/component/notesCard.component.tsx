import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { NoteCardPropType } from "@/interface/notesCard.interface";
import { CiEdit } from "react-icons/ci";

const NoteCard = ({
  id,
  color,
  date,
  title,
  truncatedContent,
  content,
  handleSummeryBtn,
  handleDelete,
  setEditInfo
}: NoteCardPropType) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleSummaryClick = async () => {
    try {
      setIsLoading(true);
      await handleSummeryBtn(content);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="p-2 shadow-lg flex flex-col justify-between"
      style={{ backgroundColor: `${color}` }}
    >
      <div>
        {/* date */}
        <div className="text-[10px] flex justify-end">{date}</div>

        {/* title */}
        <div className="text-xl text-center font-bold mb-1">{title}</div>

        {/* contents */}
        <div className="text-sm mb-1">{truncatedContent}</div>
      </div>

      {/* buttons */}
      <div className="flex justify-between items-center">
        <button
          className="bg-black text-white cursor-pointer text-sm py-1 px-2 rounded-md disabled:opacity-50"
          onClick={handleSummaryClick}
          disabled={isLoading}
          title="Generate summary"
        >
          {isLoading ? 'Generating...' : 'Summary AI✨'}
        </button>

        <div className="flex gap-4">
         <CiEdit title="Edit note" className="cursor-pointer" onClick={()=> setEditInfo({id, title, notes: content})}/>

         <RiDeleteBin5Line
            title="Delete note"
            className="cursor-pointer"
             onClick={() => handleDelete(id)}
          />
        </div>
        
          
      </div>
    </div>
  );
};

export default NoteCard;
