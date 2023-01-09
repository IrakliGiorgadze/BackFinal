import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import RecordLabel from "./RecordLabel";

describe("RecordLabel Component", () => {
  // Test 1
  test("RecordLabel Rendering", () => {
    /* Fixtures */
    const name = "Winter Primates";
    const label = {
      name: name,
      bands: [
          {
              name: "Frank Jupiter",
              festivals: [
                  {
                      "name": "LOL-palooza"
                  }
              ]
          },
          {
              name: "Propeller",
              festivals: [
                  {}
              ]
          }
      ]
  };
    render(<RecordLabel label={label} key={0} />);
    const recordlabel_label_name = screen.getByTestId("recordlabel-label-name");
    expect(recordlabel_label_name).toBeInTheDocument();

    // snapshot
    const domTree = renderer.create(<RecordLabel label={label} key={0} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });

});
