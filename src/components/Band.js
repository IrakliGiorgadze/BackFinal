/**
 * Component for showing details of the Band.
 *
 * @component
 * @example
 * const band = {
 *         name:bandName,
 *         festivals:[
 *            {
 *               name:"LOL-palooza"
 *            }
 *         ]
 *   };
 *
 * return (
 *   <li>Winter Primates<ul><li>LOL-palooza</li></ul></li>
 * )
 */
export default function Band(props) {
  return (
    <li>
      <span data-testid="band-band-name">{props.band.name}</span>
      <ul>
        {props.band.festivals &&
          props.band.festivals.map(function (festival, index) {
            return (
              <li data-testid="band-festival-name" key={index}>
                {festival.name ? festival.name : ""}
              </li>
            );
          })}
      </ul>
    </li>
  );
}
