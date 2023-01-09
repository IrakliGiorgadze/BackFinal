import Band from "./Band";

/**
 * Component for showing details of the RecordLabel.
 *
 * @component
 */
export default function RecordLabel(props) {
  return (
    <section>
      <h4 data-testid="recordlabel-label-name">{props.label.name ? props.label.name : "(independent bands)"}</h4>
      <ul>
        {props.label.bands.map(function (band, index) {
          return <Band band={band} key={index} />;
        })}
      </ul>
    </section>
  );
}
