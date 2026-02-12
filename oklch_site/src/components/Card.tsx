import { type JSX } from "solid-js";

interface CardProps {
  title?: string;
  content?: string;
  borderColor?: string;
}

export function Card(props: CardProps): JSX.Element {
  return (
    <div class="card" style={props.borderColor ? { "border-color": props.borderColor } : {}}>
      {props.title && <h3 class="card-title">{props.title}</h3>}
      {props.content && <p class="card-content">{props.content}</p>}
    </div>
  );
}
