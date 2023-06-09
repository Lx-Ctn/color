import Color from "..";
/**********************/
/**  Test Methods :  **/
/**********************/

// Test Color.toHsl() :
describe("export to hsl CSS color String", () => {
	test("hsl values should reflect color proporties", () => {
		let color = new Color();
		expect(color.toHsl()).toBe("hsl(0, 100%, 50%)");
		color = new Color(27, 33, 47);
		expect(color.toHsl()).toBe("hsl(27, 33%, 47%)");
		color.hue = 77;
		color.saturation = 77;
		color.light = 77;
		expect(color.toHsl()).toBe("hsl(77, 77%, 77%)");
	});

	test("if alpha != 100%,  hsl should switch to hsla", () => {
		let color = new Color(1, 2, 3, 4);
		expect(color.toHsl()).toBe("hsla(1, 2%, 3%, 4%)");
		color.alpha = 77;
		expect(color.toHsl()).toBe("hsla(1, 2%, 3%, 77%)");
	});

	test("hsl values should accept float to 1 decimal", () => {
		let color = new Color(9.9, 9.9, 9.9);
		expect(color.toHsl()).toBe("hsl(9.9, 9.9%, 9.9%)");
		color = new Color(9.9, 9.9, 9.9, 9.9);
		expect(color.toHsl()).toBe("hsla(9.9, 9.9%, 9.9%, 9.9%)");
		color = new Color(9.99, 9.99, 9.99, 9.99);
		expect(color.toHsl()).toBe("hsla(10, 10%, 10%, 10%)");
	});

	test.each([
		"hsl(0, 0%, 0%)",
		"hsl(200, 100%, 100%)",
		"hsl(4, 23%, 30%)",
		"hsla(0, 0%, 0%, 0%)",
		"hsla(330, 60%, 20%, 9.9%)",
	])("if %s are pass as constructor, toHsl() should be the same", hsl => {
		let color = new Color(hsl);
		expect(color.toHsl()).toBe(hsl);
	});
});

// Test Color.toHex() :
describe("export to hexa CSS color String", () => {
	test("hexa values should reflect color proporties", () => {
		let color = new Color();
		expect(color.toHex()).toBe("#ff0000");
		color = new Color(240, 0, 100);
		expect(color.toHex()).toBe("#ffffff");
		color.hue = 120;
		color.saturation = 100;
		color.light = 50;
		expect(color.toHex()).toBe("#00ff00");
	});

	test("if alpha != 100%, the string should switch to the 8 values format", () => {
		let color = new Color(0, 100, 50, 50);
		expect(color.toHex()).toBe("#ff000080");
		color = new Color("#12345678");
		expect(color.toHex()).toBe("#12345678");
	});

	test("hexa values should keep precision thanks to properties float to 1 decimal", () => {
		let color = new Color(9.9, 9.9, 9.9);
		expect(color.toHex()).toBe("#1c1817");
		color = new Color(9.9, 9.9, 9.9, 9.9);
		expect(color.toHex()).toBe("#1c181719");
		color = new Color(9.99, 9.99, 9.99, 9.99);
		expect(color.toHex()).toBe("#1c18171a");
	});

	test.each(["#ffffff", "#000000", "#123456", "#12345678", "#abcdef02"])(
		"if %s are pass as constructor, toHex() should be the same",
		hex => {
			let color = new Color(hex);
			expect(color.toHex()).toBe(hex);
		}
	);

	test("if hexa value are pass as constructor, toHex should be the same, and vice-versa", () => {
		let color = new Color("#12345678");
		expect(color.toHsl()).toBe("hsla(210, 65.4%, 20.4%, 47.1%)");
		color = new Color(210, 65.4, 20.4, 47.1);
		expect(color.toHex()).toBe("#12345678");

		color = new Color("#abcdef02");
		expect(color.toHsl()).toBe("hsla(210, 68%, 80.4%, 0.8%)");
		color = new Color(210, 68, 80.4, 0.8);
		expect(color.toHex()).toBe("#abcdef02");
	});
});

// Test Color.toRgb() :
describe("export to RGB CSS color String", () => {
	test("RGB values should reflect color proporties", () => {
		let color = new Color();
		expect(color.toRgb()).toBe("rgb(255, 0, 0)");
		color = new Color(240, 0, 100);
		expect(color.toRgb()).toBe("rgb(255, 255, 255)");
		color.hue = 120;
		color.saturation = 100;
		color.light = 50;
		expect(color.toRgb()).toBe("rgb(0, 255, 0)");
	});

	test("if alpha != 100%, the string should switch to rgba()", () => {
		let color = new Color(0, 100, 50, 50);
		expect(color.toRgb()).toBe("rgba(255, 0, 0, 0.5)");
		color = new Color("#12345678");
		expect(color.toRgb()).toBe("rgba(18, 52, 86, 0.471)");
	});

	test("values should keep precision thanks to properties float to 1 decimal", () => {
		let color = new Color(9.9, 9.9, 9.9);
		expect(color.toRgb()).toBe("rgb(28, 24, 23)");
		color = new Color(9.9, 9.9, 9.9, 9.9);
		expect(color.toRgb()).toBe("rgba(28, 24, 23, 0.099)");
		color = new Color(9.99, 9.99, 9.99, 9.99);
		expect(color.toRgb()).toBe("rgba(28, 24, 23, 0.1)");
	});

	test.each([
		"rgb(0, 0, 0)",
		"rgb(255, 255, 255)",
		"rgb(0, 0, 0)",
		"rgba(10, 234, 98, 0.001)",
		"rgba(123, 123, 255, 0.99)",
	])("if %s are pass as constructor, toRgb() should be the same", rgb => {
		let color = new Color(rgb);
		expect(color.toRgb()).toBe(rgb);
	});
});
