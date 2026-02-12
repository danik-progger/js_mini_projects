import { type Accessor, type Setter, type JSX } from "solid-js";

interface HeaderProps {
  color: Accessor<string>;
  setColor: Setter<string>;
}

export function Header(props: HeaderProps): JSX.Element {
  return (
    <header class="header">
      <h1 class="header-title">Color Card Site</h1>
      <input
        type="color"
        class="color-input"
        value={props.color()}
        onInput={(e) => props.setColor(e.currentTarget.value)}
      />
    </header>
  );
}
