export function Button(props: any) {
  return (
    <button
      type="button"
      class="m-1 bg-alternative color-alternative font-bold"
    >
      {props.children}
    </button>
  );
}
