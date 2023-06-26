<h1 align="center" id="top">Color</h1>
<p align="center">A javascript color library to easily handle color variations to create dynamic color theme, to offer custom colors to your users.</p>

---

<ul>
   <li><a href="#introduction-">Introduction</a></li>
   <li><a href="#in-short-">In short</a></li>
   <li><a href="#for-those-who-arent-familiar-with-color-theory-">Brief introduction to color theory</a>
      <ul>
      <li><a href="#color-properties-">Color properties</a></li>
      <li><a href="#color-value-">Color value</a></li>
      <li><a href="#color-harmonies-">Colors harmonies</a></li>
      <li><a href="#the-hsl-solution-">The HSL solution</a></li>
      </ul>
   </li>
   <li><a href="#the-color-object-">The Color object</a></li>
      <ul>
      <li><a href="#create-a-color-">Creation of a Color</a></li>
      <li><a href="#create-a-child-color-">Creation of a child Color</a></li>
      <li><a href="#constructor-parameters-">Constructor parameters</a></li>
      <li><a href="#parameter-object-details-">Parameter object details</a></li>
      <li><a href="#properties-">Properties</a></li>
      <li><a href="#methods-">Methods</a></li>
      </ul>
   <!--<li><a href="#exemples-">Exemples</a></li>-->
</ul>

---

<br>

## Introduction :

`Color` allows to easily handle color manipulation with access to each aspect of it (hue, saturation, light, alpha).
For exemple, you can dynamically set [_tint_, _tone_ and _shade_](#for-those-who-arent-familiar-with-color-theory-) of a color by changing only the `saturation` or `light` properties.

A main `Color` can be a reference, linked by a other `Color` with some offset in `saturation` for exemple.
That allows you to create a dynamic color theme through a set of linked `Color` which will adapt to any change from the main one.
<br>

<h6 align="right"><a href="#top"> back to top ⇧</a></h6>

---

<br>

## In short :

<br>

A simple HSL model :

```js
const {hue, saturation, light, alpha} = {360, 90, 70, 100} // A soft red

// Named properties :
const mainColor = new Color({hue, saturation, light, alpha});
// Or direct values :
const mainColor = new Color(hue, saturation, light, alpha);
```

<br>

References to link Color through a dynamic theme :

```js
const darkOffsets = { light: -30 };
const darkMainColor = new Color({ ref: mainColor, offsets: darkOffsets });

// mainColor as reference, with a -30 offset in light :
darMainColor.toHsl(); // "hsl(360, 90%, 40%)"
```

```js
mainColor.hue = 30; // If the main color change,
// All dependant Color will change accordingly :
darkMainColor.toHsl(); // "hsl(30, 90%, 40%)"
```

<br>

Simple offset or callback to fine-tune the relation between colors :

```js
const offsets = {
	saturation: sat => sat / 2,
	alpha: -30,
};
const shadowColor = new Color(mainColor, alpha);
// Callback give access to the reference property value
shadowColor.toHsl(); // "hsla(30, 45%, 30%, 70%)"
```

<br>

Use the .set() method to update a parent color with a color input value :

```js
// 1 : Offer custom colors to your users :
const colorInput = document.querySelector("input[type='color']");

colorInput.addEventListener("change", event => {
	const userColor = event.currentTarget.value;

	// 2 : Color accept CSS color string to initialize directly from inputs :
	mainColor.set(userColor); // Update your main color with .set()

	// 3 : Update your CSS with the new values :
	document.body.style.setProperty("--main-color", mainColor.toHsl());
	document.body.style.setProperty("--secondary-color", secondaryColor.toHsl());
	document.body.style.setProperty("--background-color", backgroundColor.toHsl());
});
```

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>

---

<br>

## For those who aren't familiar with color theory :

<div align="center"><figure>
<img src="./assets/colorWheel.png" width="150" alt="The color wheel" title="The color wheel">
<figcaption><h6><i>The color wheel.</i></h6></figcaption>
</figure></div>

<br>
<br>

### Color properties :

Colors can be describe by 3 properties : <i>Hue</i>, <i>intensity</i> and <i>value</i>.

<br><dl>

<dt>Hue :</dt>
<dd>The <b>pure color</b> value on which the color is based.<br>
From 0 to 360°, it indicates the color position on the color wheel.<br>
This pure color is visible at full <i>intensity</i> and a neutral <i>value</i> (no black or white added).

</dd>

<dt>Intensity :</dt>
<dd>The <b>saturation</b> of the color :<br>
It describe the brightness or dullness of the color. <br>
Intensity is highest with the pure color (hue). <br>
Intensity is low when a color is dull, tends to a gray.
<dd>

<dt>Value :</dt>
<dd>Describes the degree of lightness or darkness in color.<dd>

</dl>
<br>
<br>
<br>

### Color value :

There are 3 ways to change the <i>value</i> of a color, <i>Tint</i>, <i>tone</i> and <i>shade</i> :
<br><dl>

<dt>Tint :</dt>
<dd>Hue + white.<br>
A pure color with only white added, also called pastel.<br>
A Tint lightens the color, but it remains exactly the same color, only a paler version.
</dd>

<dt>Shade :</dt>
<dd>Hue + black.<br>
The opposite of tint, a pure color with only black added.

</dd>

<dt>Tone :</dt>
<dd>Hue + gray.<br>
A color with gray, to tone down the intensity of it :
Toned colors are generally considered more pleasing to the eye. They are complex, subtle and sophisticated.
</dd>
</dl>

<br>
<br>
<br>

### Color harmonies :

Harmonies are the combination of colors in an aesthetically pleasing way.
Here are 7 color schemes to help you choose colors that go well together, to make your design look natural and professional.

<table>

<tr>
<td>
<dl><dt>Monochromatic</dt>
<dd>Uses different <i>tones</i>, <i>shades</i> and <i>tints</i> of one color.</dd></dl>
</td><td>
<img src="./assets/monochromatic-harmony.png" width="100" alt="Monochromatic color harmony" title="Monochromatic color harmony"></td>
</tr>

<tr><td>
<dl><dt>Analogous</dt>
<dd>Uses colors that are next to each other on the color wheel.</dd></dl>
</td><td width="100">
<img src="./assets/analogous-harmony.png" width="100" alt="Analogous color harmony" title="Analogous color harmony">
</td></tr>

<tr><td>
<dl><dt>Complementary</dt>
<dd>Uses colors that are opposite each other on the wheel.</dd>
</td><td width="100">
<img src="./assets/complementary-harmony.png" width="100" alt="Complementary color harmony" title="Complementary color harmony">
</td></tr>

<tr><td>
<dl><dt>Split Complementary</dt>
<dd><dd>Uses the colors on either side of the complement.</dd></dl>
</td><td width="100">
<img src="./assets/split-complementary-harmony.png" width="100" alt="Split complementary color harmony" title="Split complementary color harmony">
</td></tr>

<tr><td>
<dl><dt>Triadic</dt>
<dd>Uses 3 colors that are equally spaced on the color wheel, forming a triangle.</dd></dl>
</td><td width="100">
<img src="./assets/triadic-harmony.png" width="100" alt="Triadic color harmony" title="Triadic color harmony">
</td></tr>

<tr><td>
<dl><dt>Tetradic</dt>
<dd>Also called <i>double complementary</i>, uses 2 complementary pairs, forming a rectangle on the wheel.</dd></dl>
</td><td width="100">
<img src="./assets/tetradic-harmony.png" width="100" alt="Tetradic color harmony" title="Tetradic color harmony">
</td></tr>

<tr><td>
<dl><dt>Squared</dt>
<dd>Uses 4 colors that are equally spaced on the color wheel, 2 complementary pairs, forming a square on the wheel.</dd></dl>
</td><td width="100">
<img src="./assets/squared-harmony.png" width="100" alt="Squared color harmony" title="Squared color harmony">
</td></tr>

</table>
<br>
<br>
<br>

### The HSL solution :

The HSL color system handle color with 3 properties : _Hue_, _Saturation_ and _Light_, based on colors properties from color theory (instead of a thechnical view like the RGB system), which make color manipulation very easy.
**This is how designer think about color, so it's important that developers can apply this vision easily.**

<br><dl>

<dt>Hue :</dt>
<dd>The <b>pure color</b> value on which the color is based.<br>
From 0 to 360°, it indicates the color position on the color wheel.<br>
This pure color is directly visible with a 100% <i>saturation</i> and a <i>light</i> at 50%.
We can easily obtain colors hamonies from hue : Take the main color, add 180°, and you get the complementary color for exemple.

</dd>

<dt>Saturation :</dt>
<dd>The <b>Intensity</b> of the color :<br>
- At 100% we have the pure color.<br>
- At 0%, it's gray. The gray value will depend on the <i>light</i> property.<br>
This is how we get <i>tone</i> variation.
<dd>

<dt>Light :</dt>
<dd>The brightness of the color :<br>
- At 50% we have the pure color.<br>
- With more light, we obtain a brighter color, until pure white at 100%. This is how we get <i>tint</i> variation.<br>
- With less light, we obtain a darker color, until pure black at 0%. This is how we get <i>shade</i> variation.
<dd>

</dl>

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>

---

<br>

## The Color object :

<br>

### Create a Color :

<br>

```js
const hue = 360; // red
const saturation = 90;
const light = 70;
const alpha = 100;
```

<br>

```js
new Color(hue, saturation, light, alpha);
```

<dl><dd><dl><dd>Will create a Color object folowing the HSL system.</dd></dl></dd></dl>
<br>

```js
const properties = {
	hue: 240,
	saturation: 100,
	light: 30,
	alpha: 80,
};
new Color(properties);
new Color({ properties, offsets: {} });
```

<dl><dd><dl><dd>Color can take an object as parameter, with named properties to ease the DX.</dd></dl></dd></dl>
<br>

```js
new Color("#ff0000");
new Color("rgb(255, 0, 0)");
new Color("hsl(360, 100, 50)");
```

<dl><dd><dl><dd>
Color accept CSS color string as parameter.<br>
All Color properties will be create from the CSS value, every arguments following the string will be ignored. 
</dd></dl></dd></dl>
<br>

```js
new Color();
```

<dl><dd><dl><dd>Every parameters are optional.<br>

**Default values :**

-  `hue = 0`, 0 deg on the color wheel is pure red.
-  `saturation = 100`, 100% : Pure color.
-  `light = 50`, 50% : Pure color (0% is black, 100% is white).
-  `alpha = 100`, 100% : No transparency.
</dd></dl></dd></dl>

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>
<br>

### Create a child Color :

<br>

An other _Color_ object can be passed as parameter :
It will be the reference to keep a dynamic link to its properties.

```js
const mainColor = new Color(360, 90, 70);

// mainColor as reference, with a -30 offset in light :
const darkMainColor = new Color(mainColor, { light: -30 });

darMainColor.toHsl(); // "hsl(360, 90%, 40%)"
```

The new instance inherit the properties of the reference.
Offset properties allows a dynamic shift of the reference value :
If the parent Color change, the child inherit the change as well.

```js
mainColor.hue = 30; // If the main color change,
// All dependant Color will change accordingly :
darkMainColor.toHsl(); // "hsl(30, 90%, 40%)"
```

<br>
<br>
<br>

```js
new Color(ParentColor, { saturation: -30, light: +20 });
```

<dl><dd><dl><dd>Will create a child <i>Color</i> from the <code>ParentColor</code> object with optional offsets in <i>hue</i>, <i>saturation</i>, <i>light</i> or <i>alpha</i>.
</dd></dl></dd></dl>
<br>

```js
new Color({ ref: ParentColor, offsets: { saturation: -30, light: +20 } });
```

<dl><dd><dl><dd>Color can take an object as parameter, with named properties to ease the DX.
</dd></dl></dd></dl>
<br>

```js
new Color(ParentColor);
```

<dl><dd><dl><dd>Offsets are optional.<br>

**Default values :**

-  `hueOffset = 0`, No shift from the reference _hue_.
-  `saturationOffset = 0`, No shift from the reference _saturation_.
-  `lightOffset = 0`, No shift from the reference _light_.
-  `alphaOffset = 0`, No shift from the reference _alpha_.
</dd></dl></dd></dl>

<br>
<br>
<br>

```js
// Simple offset, added to the reference value :
childColor.saturationOffset = 10;

// Or callback :
childColor.lightOffset = lightRef => lightRef / 2;

childColor.alphaOffset = alphaRef => {
	// take the reference value,
	if (alphaRef > 50) return alphaRef - 20;
	return alphaRef / 2;
	// return a new value.
};
```

Simple offset or callback to fine-tune the relation between colors.
<br>

```js
childColor.saturation = 50; // Set a fixed value on a child Color
```

A property can be set directly on the child _Color_.
This value will be fixed, independent of the reference value.

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>
<br>

### Constructor parameters :

<br>

<dl>
<code><b>Color</b></code> <i>(Optional)</i>
<dd><dl><dd>The 1<sup>st</sup> parameter accepts 4 types of value :

-  **_Hue_** : A number for the color position on the color wheel.
   It will still work if the number is outside the usual position (between 0 and 360°), or a CSS `<angle>` string ( deg | turn | rad | grad ), that will determine the _hue_ value.
   > For exemple `-120` will have the same result as `240` (-120 + 360 = 240 : same position on the wheel).
-  **_CSS color string_** : A hexadecimal ( `"#ff0000"` ), RGB ( `"rgb(255, 0, 0)"` ) or HSL ( `"hsl(0, 100, 50)"` ) color format that will determine the _hue_, _saturation_, _light_ and _alpha_ values.
   > <details><summary>See details</summary><p>Hexadecimal color format accepts 3 (4 with alpha) or 6 (8 with alpha) hexadecimal values. </p><p>RGB format accepts <code>direct value</code> or <code>%</code>. It accepts <code>comma</code>, <code>space</code> or <code>forward slash</code> for value separator. Optional alpha value is accepted for both <code>rgb</code> and <code>rgba</code>.</p><p>HSL format accepts <code>direct value</code>, or <code>< angle ></code> value ( deg | turn | rad | grad ), for the hue value, and <code>%</code> for other values. It accepts <code>comma</code>, <code>space</code> or <code>forward slash</code> for value separator. Optional alpha value is accepted for both <code>hsl</code> and <code>hsla</code>.</p></details>
   > All next parameters will be ignored.
-  **_Color object_** : An other Color object can be passed, to be the reference on which this new Color will be based.
   > All next parameters become _offset_ to shift from this reference.
-  **_Object_** : An object with a collection of named properties to easily set any option of the Color object in one go. See the <a href="#parameter-object-details-">parameter object details</a> section to know more.

   > All next parameters will be ignored.

      </dd></dl></dd>
      </dl>
      <br>

<dl>
<code><b>Saturation / Offsets</b></code> <i>(Optional)</i>
<dd><dl><dd>The 2<sup>nd</sup> parameter set the <i>saturation</i> value, or the offsets for a child Color :

-  If the 1<sup>st</sup> parameter is a **_hue_ value** : this one have to be a `number` and will set the _saturation_ value (`100` by default : Pure color).
-  If the 1<sup>st</sup> parameter is a **_Color_ object** : this one have to be a object that will set the offsets values (`0` by default for all offsets : No offset).<details><summary>See details</summary>The offsets object accepts 4 properties : `hue`, `saturation`, `light` and `alpha`, that will sets the offset for the corresponding color value (See <a href="#offsets-parameter-object-">offsets parameter object </a>).<br>Each is optionnal, and accept : <br>- A `number`, which will be add to the parent value to obtain the child value, <br>- Or a `callback`, which will get the parent value as parameter, and have to return a `number` to be the child value.</details>
-  If the 1<sup>st</sup> parameter is a **_CSS color string_** or a **object** : this one will be ignored.
</dd></dl></dd>
</dl>
<br>

<dl>
<code><b>Light</b></code> <i>(Optional)</i>
<dd><dl><dd>The 3<sup>rd</sup> parameter set the <i>light</i> value :

-  If the 1<sup>st</sup> parameter is a **_hue_ value** : this one have to be a `number` and will set the _light_ value ( `50` by default: Pure color ).
-  For **all other case** : this one will be ignored.
</dd></dl></dd>
</dl>
<br>

<dl>
<code><b>Aplha</b></code> <i>(Optional)</i>
<dd><dl><dd>The 4<sup>th</sup> parameter set the <i>alpha</i> (transparency) value :

-  If the 1<sup>st</sup> parameter is a **_hue_ value** : this one have to be a `number` and will set the _alpha_ value ( `100` by default : No transparency ).
-  For **all other case** : this one will be ignored.
</dd></dl></dd>
</dl>

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>
<br>

### Parameter object details :

<br>

##### General parameter object :

If the 1<sup>st</sup> parameter is a object, all Color properties can be set in one go :

-  Every properties are optionnal.
-  If a color property is set both directly ( `{ hue }` ) and in a collection of properties object ( `{ properties: { hue } }` ), the value in the set will take priority and the direct property will be ignored.
-  Idem for offsets.
-  `parentColor` is a alias for `ref` to assign a parent Color. If both are put, `parentColor` will be ignored.

```js
{
   // Color properties :
   hue : number | <angle> string,
   saturation: number,
   light: number,
   alpha: number,

   // Collection of color properties :
   properties: {
      hue : number | <angle> string,
      saturation: number,
      light: number,
      alpha: number,
   }

   // CSS color string (hexa, rgb or hsl) :
   css: string,

   // Color reference :
   ref: Color,
   parentColor: Color, // Alias

   // Offsets :
   hueOffset : number | (parentHue) => number,
   saturationOffset: number | (parentSaturation) => number,
   lightOffset: number | (parentLight) => number,
   alphaOffset: number | (parentAlpha) => number,

   // Collection of offsets :
   Offsets: {
      hue : number | (parentHue) => number,
      saturation: number | (parentSaturation) => number,
      light: number | (parentLight) => number,
      alpha: number | (parentAlpha) => number,
   }
}
```

<br>
<br>

##### Offsets parameter object :

If the 1<sup>st</sup> argument is a Color object to set the parent reference, the 2<sup>nd</sup> argument is a object of offsets :

```js
{
   // Offsets :
   hue : number | (parentHue) => number,
   saturation: number | (parentSaturation) => number,
   light: number | (parentLight) => number,
   alpha: number | (parentAlpha) => number,
}
```

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>
<br>

### Properties :

<br>
<br>

##### Color properties :

<br>

<dl>
<code><b>Color.hue</b></code>
<dd><dl><dd>Get / set the hue value of the color (its position on the color wheel) :

> If this value is set on a child <code>Color</code>, the parent hue value will be ignored.

-  Getter <code>Color.hue</code> : 0 ⩽ number < 360 .
   -  If <code>Color</code> is a child with no own hue value:
      <code>hue</code> will return the value of the parent with the offset applied.
   -  Default value : `0` (red).
-  Setter <code>Color.hue = number | css \<angle\> string</code> :
   -  If `null` or `undefined`, assignment will be ignored.
   -  No need to format the number between 0 and 360, it will still work outside the usual position.
      > For exemple `-120` will have the same result as `240` (-120 + 360 = 240 : same position on the wheel).
        </dd></dl></dd>
        </dl>
        <br>

<dl>
<code><b>Color.saturation</b></code>
<dd><dl><dd>Get / set the saturation value of the color (its intensity) :

> If this value is set on a child <code>Color</code>, the parent saturation value will be ignored.

-  Getter <code>Color.saturation</code> : 0 ⩽ number ⩽ 100 .
   -  If <code>Color</code> is a child with no own saturation value, <code>saturation</code> will return the value of the parent with the offset applied.
   -  Default value : `100` (pure color).
-  Setter <code>Color.saturation = number</code> :
   -  Every number below `0` will set the saturation to `0`.
   -  Every number above `100` will set the saturation to `100`.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>
   <br>

<dl>
<code><b>Color.light</b></code>
<dd><dl><dd>Get / set the light value of the color :

> If this value is set on a child <code>Color</code>, the parent light value will be ignored.

-  Getter <code>Color.light</code> : 0 ⩽ number ⩽ 100 .
   -  If <code>Color</code> is a child with no own light value, <code>light</code> will return the value of the parent with the offset applied.
   -  Default value : `50` (pure color).
-  Setter <code>Color.light = number</code> :
   -  Every number below `0` will set the light to `0`.
   -  Every number above `100` will set the light to `100`.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>
   <br>

<dl>
<code><b>Color.alpha</b></code>
<dd><dl><dd>Get / set the alpha value of the color (transparency) :

> If this value is set on a child <code>Color</code>, the parent alpha value will be ignored.

-  Getter <code>Color.alpha</code> : 0 ⩽ number ⩽ 100 .
   -  If <code>Color</code> is a child with no own alpha value, <code>alpha</code> will return the value of the parent with the offset applied.
   -  Default value : `100` (no transparency).
-  Setter <code>Color.alpha = number</code> :
   -  Every number below `0` will set the alpha to `0`.
   -  Every number above `100` will set the alpha to `100`.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>

<br>
<br>
##### Offsets properties :
<br>

<dl>
<code><b>Color.hueOffset</b></code>
<dd><dl><dd>Get / set the offset applied to the hue value of the <code>Color</code> parent's (to obtain this <code>Color</code> hue value).

> If <code>Color</code> don't have a parent, offset will be ignored.

-  Getter <code>Color.hueOffset</code> : number | function.
   -  Default value : `0` (no change from parent value).
-  Setter <code>Color.hueOffset = number | function</code>.
   -  If `hueOffset` is a _number_, the `hue` value will be `Parent.hue` + `Child.hueOffset`.
   -  If `hueOffset` is a _function_, the `Parent.hue` value will be given as parameter, and the function must return the wanted `hue` value.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>
   <br>

<dl>
<code><b>Color.saturationOffset</b></code>
<dd><dl><dd>Get / set the offset applied to the saturation value of the <code>Color</code> parent's (to obtain this <code>Color</code> saturation value).

> If <code>Color</code> don't have a parent, offset will be ignored.

-  Getter <code>Color.saturationOffset</code> : number | function.
   -  Default value : `0` (no change from parent value).
-  Setter <code>Color.saturationOffset = number | function</code>.
   -  If `saturationOffset` is a _number_, the `saturation` value will be `Parent.saturation` + `Child.saturationOffset`.
   -  If `saturationOffset` is a _function_, the `Parent.saturation` value will be given as parameter, and the function must return the wanted `saturation` value.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>
   <br>

<dl>
<code><b>Color.lightOffset</b></code>
<dd><dl><dd>Get / set the offset applied to the light value of the <code>Color</code> parent's (to obtain this <code>Color</code> light value).

> If <code>Color</code> don't have a parent, offset will be ignored.

-  Getter <code>Color.lightOffset</code> : number | function.
   -  Default value : `0` (no change from parent value).
-  Setter <code>Color.lightOffset = number | function</code>.
   -  If `lightOffset` is a _number_, the `light` value will be `Parent.light` + `Child.lightOffset`.
   -  If `lightOffset` is a _function_, the `Parent.light` value will be given as parameter, and the function must return the wanted `light` value.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>
   <br>

<dl>
<code><b>Color.alphaOffset</b></code>
<dd><dl><dd>Get / set the offset applied to the alpha value of the <code>Color</code> parent's (to obtain this <code>Color</code> alpha value).

> If <code>Color</code> don't have a parent, offsets will be ignored.

-  Getter <code>Color.alphaOffset</code> : number | function.
   -  Default value : `0` (no change from parent value).
-  Setter <code>Color.alphaOffset = number | function</code>.
   -  If `alphaOffset` is a _number_, the `alpha` value will be `Parent.alpha` + `Child.alphaOffset`.
   -  If `alphaOffset` is a _function_, the `Parent.alpha` value will be given as parameter, and the function must return the wanted `alpha` value.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>

<br>
<br>
##### Color reference properties :
<br>

<dl>
<code><b>Color.ref</b></code>
<dd><dl><dd>Get / set the parent <code>Color</code> reference (use to get color properties through offsets).

> A Color reference cannot be deleted, only update by a new one.

-  Getter <code>Color.ref</code> : Color.
   -  Default value : `undefined` ( no parent Color ).
-  Setter <code>Color.ref = Color</code>.
   -  If `null` or `undefined`, assignment will be ignored.
      </dd></dl></dd>
      </dl>
   <br>
   <dl>
   <code><b>Color.parent</b></code>
   <dd><dl><dd>A alias for the <code>.ref</code> property.

> A Color reference cannot be deleted, only update by a new one.

-  Getter <code>Color.parent</code> : Color.
   -  Default value : `undefined` ( no parent Color ).
-  Setter <code>Color.parent = Color</code>.
   -  If `null` or `undefined`, assignment will be ignored.
   </dd></dl></dd>
   </dl>

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>
<br>

### Methods :

<br>
<br>

##### CSS color string export methods :

<br>

<dl>
<dt><code>.toHsl()</code></dt>
<dd><dl><dd>Return the HSL value of the color in CSS compatible string.</dd></dl></dd>
</dl>

```js
const mainColor = new Color(360, 90, 70);
mainColor.toHsl(); // "hsl(360, 90%, 70%)"

mainColor.alpha = 50;
mainColor.toHsl(); // "hsla(360, 90%, 70%, 50%)"
```

<br>

<dl>
<dt><code>.toRgb()</code></dt>
<dd><dl><dd>Return the RGB value of the color in CSS compatible string.</dd></dl></dd>
</dl>

```js
const mainColor = new Color(360, 90, 70);
mainColor.toRgb(); // "rgb(247, 110, 110)"

mainColor.alpha = 50;
mainColor.toRgb(); // "rgba(247, 110, 110, 0.5)"
```

<br>

<dl>
<dt><code>.toHex()</code></dt>
<dd><dl><dd>Return the hexadecimal value of the color in CSS compatible string.</dd></dl></dd>
</dl>

```js
const mainColor = new Color(360, 90, 70);
mainColor.toHex(); // "#f76e6e"

mainColor.alpha = 50;
mainColor.toHex(); // "#f76e6e80"
```

<br>
<br>
##### All in one update methods :
<br>

<dl>
<dt><code>.set()</code></dt>
<dd><dl><dd>Act like a <code>new Color()</code> constructor to update a Color with new values without breaking the reference for the child Color like <code>new Color()</code> would.<br>
Difference with the constructor : if any property in the <code>.set()</code> method is missing, the original will be kept and not set to the default value.</dd></dl></dd>
</dl>

```js
const color = new Color({
	properties: { hue: 180, light: 35 },
	offsets: { saturation: sat => sat / 2 },
});

color.set(); // No changes.
color.set({ hue: 0 }); // Only the hue property will change.
// All color properties will be set from the CSS string :
color.set("#ff0000"); // The offsets will remain unchanged.
```

<br>

<dl>
<dt><code>.reset()</code></dt>
<dd><dl><dd>Act like a <code>new Color()</code> constructor to update a Color with new values without breaking the reference for the child Color like <code>new Color()</code> would.<br>
Every missing property in the <code>.reset()</code> method will be reset to the default value, <b>except the <code>ref</code> ( parent Color ) wich can only be replace by a other <code>Color</code> or remain</b>.</dd></dl></dd>
</dl>

```js
const color = new Color({
	properties: { hue: 180, light: 35 },
	offsets: { saturation: sat => sat / 2 },
});

color.reset(); // Back to default values, no offsets.
// hue property will be 123 :
color.reset({ hue: 123 }); // All other set to default values.
// All color properties will be set from the CSS string :
color.reset("#ff0000"); // The offsets will reset to 0.
```

<br>

<dl>
<dt><code>.setColorProperties()</code></dt>
<dd><dl><dd>Set all color properties ( <code>hue</code>, <code>saturation</code>, <code>light</code>, <code>alpha</code>) at once.<br>
Only the provided values will be update, if any property in the <code>.setColorProperties()</code> method is missing, the original will be kept and not set to the default value.<br>
Accept only a object with color properties <code>{ hue?, saturation?, light?, alpha? }</code>.</dd></dl></dd>
</dl>

```js
const color = new Color({ hue: 180, light: 35 });

color.setColorProperties(); // No changes.
color.setColorProperties({ hue: 123 }); // Only hue will change.
```

<br>

<dl>
<dt><code>.setColorOffsets()</code></dt>
<dd><dl><dd>Set all color offsets ( <code>hue</code>, <code>saturation</code>, <code>light</code>, <code>alpha</code>) at once.<br>
Only the provided values will be update, if any property in the <code>.setColorOffsets()</code> method is missing, the original will be kept and not set to the default value.<br>
Accept only a object with color offsets <code>{ hue?, saturation?, light?, alpha? }</code>.</dd></dl></dd>
</dl>

```js
const darkChild = new Color(parent, { saturation: -20, light: -20 });

darkChild.setColorOffsets(); // No changes.
darkChild.setColorOffsets({ alpha: -30 }); // Add a alpha offset.
```

<br>
<h6 align="right"><a href="#top"> back to top ⇧</a></h6>
