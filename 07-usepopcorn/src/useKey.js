import { useEffect } from "react";

export function useKey(key, action){

    useEffect(() => {
        function callback(e) {
          if (e.code.toLowerCase() === key.toLowerCase()) {
            action();
          }
        }
      
        document.addEventListener('keydown', callback); //แอด EventListener ทุกครั้ง
        return () => document.removeEventListener('keydown', callback); //ต้อง รีมูฟ EventListener ออกให้หมดทุกครั้ง
        
      }, [key, action]);
}