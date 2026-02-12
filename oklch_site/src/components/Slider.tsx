import { type JSX, type Accessor, type Setter } from "solid-js";

interface SliderProps {
  label: string;
  value: Accessor<number>;
  onChange: Setter<number>;
  min: number;
  max: number;
  unit?: string;
  startLabel: string;
  endLabel: string;
  sliderClass: string;
}

export function Slider(props: SliderProps): JSX.Element {
  return (
    <div class="slider-group">
      <label class="slider-label">
        <span>{props.label}</span>
        <span class="slider-value">
          {props.value()}{props.unit || ""}
        </span>
      </label>
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={props.value()}
        onInput={(e) => props.onChange(Number(e.currentTarget.value))}
        class={`slider ${props.sliderClass}`}
      />
      <div class="slider-endpoints">
        <span>{props.startLabel}</span>
        <span>{props.endLabel}</span>
      </div>
    </div>
  );
}
