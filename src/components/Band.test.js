import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Band from "./Band";

describe("Band Component", () => {
  // Test 1
  test("Band Rendering with name and festivals", () => {
    /* Fixtures */
    const bandName = "Winter Primates";
    const band = {
      name: bandName,
      festivals: [
        {
          name: "LOL-palooza",
        },
        {
          name: "MIDI",
        },
      ],
    };
    render(<Band band={band} key={0} />);
    const band_band_name = screen.getByTestId("band-band-name");
    expect(band_band_name).toBeInTheDocument();

    // snapshot
    const domTree = renderer.create(<Band band={band} key={0} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  // Test 2
  test("Band Rendering with empty festivals", () => {
    /* Fixtures */
    const bandName = "Winter Primates";
    const band = {
      name: bandName,
      festivals: [],
    };
    render(<Band band={band} key={0} />);
    const band_band_name = screen.getByTestId("band-band-name");
    expect(band_band_name).toBeInTheDocument();
    // snapshot
    const domTree = renderer.create(<Band band={band} key={0} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  // Test 3
  test("Band Rendering with missing festivals", () => {
    /* Fixtures */
    const bandName = "Winter Primates";
    const band = {
      name: bandName,
    };
    render(<Band band={band} key={0} />);
    const band_band_name = screen.getByTestId("band-band-name");
    expect(band_band_name).toBeInTheDocument();

    // snapshot
    const domTree = renderer.create(<Band band={band} key={0} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
