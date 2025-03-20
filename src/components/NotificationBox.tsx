import React, { useRef, useEffect } from "react";
import "../styles/NotificationBox.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  iconRef: React.RefObject<HTMLButtonElement | null>; // null 가능하도록 수정
}

const NotificationBox: React.FC<Props> = ({ isOpen, onClose, iconRef }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        boxRef.current && 
        !boxRef.current.contains(event.target as Node) && 
        iconRef.current !== event.target // 아이콘 클릭 시 닫히지 않도록 추가
      ) {
        onClose(); // 외부 클릭 시만 닫기
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, iconRef]);

  return (
    <div className={`notification-box ${isOpen ? "open" : ""}`} ref={boxRef}>
      <h3>소식함</h3>
      <div className="notification-content">
        <p>새로운 소식이 없어요</p>
      </div>
    </div>
  );
};

export default NotificationBox;