import { useEffect, useState } from "react";
import "./GameProgressBar.css";
interface AutoGameProgressBarProps {
  total: number;
  value: number;
  unit: string;
  barColor?: string;
  hitColor?: string;
  label?: string;
  labelClass?: string;
}

export const AutoGameProgressBar: React.FC<AutoGameProgressBarProps> = (props) => {
  const [total, setTotal] = useState(props.total);
  const [value, setValue] = useState(-1);
  const [barWidth, setBarWidth] = useState(100);
  const [_hitWidth, setHitWidth] = useState(0);

  useEffect(() => {
    setTotal(props.total);
    //initial bar setup
    if(value === -1){
      setBarWidth((props.value / props.total)*100);
      setValue(props.value);
    }
    else {
      animateBar(props.value);
    }
    
    console.log(`${props.value}/${props.total}`);
  }, [props.value, props.total]);

  const animateBar = (newValue: number) => {
    if(value === newValue) return;
    // max damage is essentially quarter of max life
    const damage = newValue - value;
    // calculate the percentage of the total width
    const newBarWidth = (newValue / total) * 100;
    const newHitWidth = (damage / value) * 100;

    // show hit bar and set the width
    setHitWidth(newHitWidth);
    setValue(newValue);
    setTimeout(() => {
      setHitWidth(0);
      setBarWidth(newBarWidth);
    });


    if (value <= 0) {
      setValue(total);
      setBarWidth(100);
    }
  };

  return (
    <>
      <div className="container">
        <div className={`label ${props.labelClass}`}>
          {props.label == "top"
            ? `${Math.round(barWidth * 100) / 100}% ${props.unit || ""}`
            : ""}
        </div>

        <div className={`health-bar`}>
          <div className={`bar-wrapper ${props.hitColor || "bg-red-300"}`}>
            <div
              className={`bar ${props.barColor || "bg-red-500"}`}
              style={{ width: `${barWidth}%` }}
            ></div>
          </div>
        </div>
        <div className={`label ${props.labelClass}`}>
          {props.label == "bottom"
            ? `${Math.round(barWidth * 100) / 100}% ${props.unit || ""}`
            : ""}
        </div>
      </div>
    </>
  );
};
