import "./RouterError.css";

export default function RouterError() {
  return (
    <div id="route-error">
      <h4>Oops!</h4>
      <p>Sorry, an unexpected error has occured.</p>
      <p id="err-type">Not found</p>
    </div>
  );
}