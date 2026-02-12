import React from "react";
import { mount } from "enzyme";
import DateField from "../DateField";
import CalendarDay from "./CalendarDay";
import CalendarGrid from './CalendarGrid';
import PropTypes from "prop-types";

describe("DateField", () => {
  let props;
  let mountedDateField;
  const id = "date";

  const wrapper = () => {
    if (!mountedDateField) {
      mountedDateField = mount(
        <DateField
        id={id}
        {...props}
        />);
    }
    return mountedDateField;
  };

  beforeEach(() => {
    props = {
      label: undefined,
      isValid: undefined,
      disabled: undefined,
      required: undefined,
      value: undefined,
      errorMessage: undefined,
      hintText: undefined,
      placeholder: undefined,
      upperLimit: undefined,
      lowerLimit: undefined,
      handleDayChange:undefined,
      range:undefined,
      name: undefined,
      disabledDates:undefined
    };
    mountedDateField = undefined;
  });

  it("renders a div", () => {
    const divs = wrapper().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("check that data-component attribute is Date Field'", () => {
    expect(wrapper().find("div").first().props()).toMatchObject({
      "data-component": "DateField"
    });
  });

  it("has an input", () => {
    const div = wrapper().find("div").first();
    expect(div.find("input").length).toBe(1);
  });

  it("has default label", () => {
    const label = wrapper().find("label");
    expect(label.text()).toBe("Date")
  });

  it("has default hint text", () => {
    const pElement = wrapper().find("p");
    expect(pElement.hasClass("hintStyle")).toBe(true);
    expect(pElement.text()).toBe("MM/DD/YYYY");
  });

  it("has calendar button", () => {
    const calendarButton = wrapper().find("button");
    expect(calendarButton.hasClass("calendarLaunchBtn")).toBe(true);
    expect(calendarButton.length).toBe(1);
  });

});


