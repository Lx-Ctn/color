/*

/*********************************/
/***  Custom error messages :  ***/
/*********************************/

export const getErrorMessage = {
	stringArgument: value => `Argument must be a valid CSS color string, but "${value}" was passed.
${checkDocsMessage(docsAnchors.arguments)}`,

	directValues: (propertyName, value, isInConstructor = false) => {
		const expected =
			propertyName === "hue" || propertyName === "main"
				? expectedTypes.directValuehue
				: expectedTypes.directValues;
		return isInConstructor
			? argumentsMessageLayout(value, propertyName, expected)
			: propertiesMessageLayout(value, propertyName, expected);
	},

	offset: (propertyName, value, isInConstructor = false) => {
		propertyName = `${propertyName} offset`;
		return isInConstructor
			? argumentsMessageLayout(value, propertyName, expectedTypes.offset)
			: propertiesMessageLayout(value, propertyName, expectedTypes.offset);
	},

	callback: (propertyName, returnValue) => {
		propertyName = `Callback in your "${propertyName}Offset" property`;
		return callbackMessageLayout(returnValue, propertyName, expectedTypes.callback);
	},

	object: {
		set: (set, setName) =>
			argumentsMessageLayout(set, `${setName} set`, expectedTypes.object.set, setBlueprint(setName)),

		properties: (propertyName, value) => {
			const name = `{ properties.${propertyName} }`;
			return argumentsMessageLayout(value, name, expectedTypes.object.properties(propertyName));
		},

		parentColor: parentColor =>
			argumentsMessageLayout(parentColor, "{ ref | parentColor }", expectedTypes.object.parentColor),
	},
};
/*



*/
const expectedTypes = {
	directValuehue:
		"number, a CSS color string, a <angle> string, a Color object, or a object with a set of named properties",
	directValues: "number",
	offset: "number, or a function returning a number",
	callback: "number",
	object: {
		set: "object",
		properties: propertyName => `number${propertyName === "hue" ? " or a <angle> string" : ""}`,
		parentColor: "Color object",
	},
};
/*



*/ // Messages layout :
const argumentsMessageLayout = (value, propertyName, expected, blueprint = "") => {
	return `${displayWrongValue(value)} was passed for the ${propertyName} argument, but a ${displayExpectedTypes(
		value,
		expected
	)} is expected. ${blueprint ? "\n" + blueprint : ""}
${checkDocsMessage(docsAnchors.arguments)}`;
};

const propertiesMessageLayout = (value, propertyName, expected) => {
	return `The ${propertyName} property return ${displayWrongValue(
		value
	)}, but must return a ${displayExpectedTypes(value, expected)}.
${checkDocsMessage(docsAnchors.properties)}`;
};

const callbackMessageLayout = (value, propertyName, expected) => `${propertyName} return ${displayWrongValue(
	value
)} but must return a ${displayExpectedTypes(value, expected)}.
${checkDocsMessage(docsAnchors.properties)}`;
/*



*/
const displayWrongValue = value => {
	return Number.isNaN(value)
		? " NaN "
		: `' ${typeof value !== "function" ? JSON.stringify(value) : value} ', a ${typeof value},`;
};

const displayExpectedTypes = (value, expected) => (Number.isNaN(value) ? "valid " + expected : expected);

const docsAnchors = {
	presentation: "the-color-object",
	arguments: "constructor-parameters",
	properties: "properties",
};

const checkDocsMessage = (where = docsAnchors.presentation) =>
	`Check docs at https://github.com/Lx-Ctn/color/#${where}- to know more.`;

const setBlueprint = propertyName => `	${propertyName} = { 
		hue?: number | ${propertyName === "offsets" ? "() => number" : "string"}, 
		saturation?: number${propertyName === "offsets" ? " | () => number" : ""}, 
		light?: number${propertyName === "offsets" ? " | () => number" : ""}, 
		alpha?: number${propertyName === "offsets" ? " | () => number" : ""} 
	}`;
