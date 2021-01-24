# el - Templating Function

> `el` is used to create new DOM elements in Javascript without having to use string concatenation.

```jsx
// el - Templating Function
const el = (type = null, props = {}, ...children) => {
	// Return, no type declared.
	if (!type) {
		return console.error("Provide `type` to create document element.");
	}

  // Create element with optional attribute props
  const docEl = Object.assign(document.createElement(type), props);

  // Children: array containing strings or elements
  children.forEach((child) => {
    if (typeof child === "string") {
      docEl.appendChild(document.createTextNode(child));
    } else if (Array.isArray(child)) {
      child.forEach((c) => docEl.appendChild(c));
    } else {
      docEl.appendChild(child);
    }
  });

  return docEl;
};
```

### **Parameters**

- `type` String. required. A string that specifies the type of element to be created. The nodeName of the created element is initialized with the value of tagName. *e.g. div, p, ul, li*
- `props` Object. optional. e.g. { className: "wrapper", id: "news-section", onclick: <function>, *data: { see below }* }
    - data: Object. optional. Used as a custom data object attached to the DOM element API. *This will not be visible in the source, but will be attached to the element in the DOM.*
- `children` String|Array of DOMElement(s)|Additional **el'**s. optional.

### Examples

---

**Basic**

```html
// Container
<div class="schools"></div>
```

```jsx
// List ~ ul
const list = el(
	"ul", 
	{ className: "school-names" },
	el("li", {}, "University of Illinois"),
	el("li", {}, "Indiana University"),
	el("li", {}, "Purdue University")
);

// Append to Selector
document.querySelector(".schools").appendChild(list);
```

**Result**

```html
<div class="schools">
  <ul class="school-names">
    <li>University of Illinois</li>
		<li>Indiana University</li>
		<li>Purdue University</li>
  </ul>
</div>
```

**Basic** *~ Nesting*

```html
// Container
<div class="schools"></div>
```

```jsx
// Special OnClick Event
const toggleH3Class = function(e) {
	e.target.classList.toggle("black");
};

// School Section
const school = el(
	"div", 
	{ className: "school" },
	el("h2", { className: "title", data: { school: "University of Illinois" }, "University of Illinois"),
	el("h3", { className: "blue", onclick: toggleH3Class }, "Welcome to the University of Illinois"),
	el("p", {}, "Reprehenderit incididunt occaecat do veniam exercitation. Ea voluptate quis dolore cupidatat. Mollit exercitation non eu aliqua ad irure mollit nisi magna minim officia officia duis consectetur. In quis magna labore velit cillum duis nostrud in quis incididunt ut. Elit consequat commodo nulla enim proident esse occaecat incididunt voluptate id elit occaecat minim. Labore adipisicing exercitation ut aliqua nisi eiusmod eu. Tempor mollit enim anim quis anim minim Lorem duis consequat amet et pariatur ad quis."),
  el("div", { className:"social-links" }, 
    el("a", { href: "https://www.facebook.com/example/", target: "_blank" }, "Facebook"),
	  el("a", { href: "https://www.twitter.com/example/", target: "_blank" }, "Twitter"),
  )
);

// Append to Selector
document.querySelector(".schools").appendChild(school);
```

**Result**

```html
<div class="schools">
  <div class="school">
    <h2 class="title">University of Illinois</h2>
    <h3>Welcome to the University of Illinois</h3>
		<p>Reprehenderit incididunt occaecat do veniam exercitation. Ea voluptate quis dolore cupidatat. Mollit exercitation non eu aliqua ad irure mollit nisi magna minim officia officia duis consectetur. In quis magna labore velit cillum duis nostrud in quis incididunt ut. Elit consequat commodo nulla enim proident esse occaecat incididunt voluptate id elit occaecat minim. Labore adipisicing exercitation ut aliqua nisi eiusmod eu. Tempor mollit enim anim quis anim minim Lorem duis consequat amet et pariatur ad quis.</p>
		<div class="social-links">
			<a href="https://www.facebook.com/example/" target="_blank">Facebook</a>
      <a href="https://www.twitter.com/example/" target="_blank">Twitter</a>
		</div>
  </ul>
</div>
```

**Intermediate** ~ *****Using `el` with `map`*

```html
// Container
<div class="schools"></div>
```

```jsx
// Schools
const schools = [
	"University of Illinois",
	"Indiana University",
	"Purdue University",
  "South Dakota State"
];

// List ~ ul with lis
const list = el(
	"ul", 
	{ className: "school-names" },
	schools.map((school) => el("li", {}, school))
);

// Append to Selector
document.querySelector(".schools").appendChild(list);
```

**Result**

```html
<div class="schools">
  <ul class="school-names">
    <li>University of Illinois</li>
		<li>Indiana University</li>
		<li>Purdue University</li>
    <li>South Dakota State</li>
  </ul>
</div>
```

**Advanced** ~ *****Breaking it into pseudo `components`*

```html
// Container
<div class="people-section"></div>
```

```jsx
// Container Selector
const peopleSection = document.querySelector(".people-section");

// List Item ~ li
const listItem = (person) => 
		el(
			"li", 
			{ className: "person" }, 
			`${person.name} is ${person.age} old, lives in ${person.location} and is good at ${person.skill}!`
		);

// List ~ ul
const list = (people) =>
	el(
		"ul", 
		{ className: "people" },
		people.map(listItem)
	);

// Static Example
people = [
 { name: "Brian", age: 100, location: "boonies", skill: "beer drinking and working on his camaro" },
 { name: "Jason", age: 18, location: "west boonies", skill: "push ups" },
 { name: "Josh", age: 25, location: "awesomeville", skill: "dunking balls" }
];

// Append to Selector
peopleSection.appendChild(list(people));

// API Endpoint/Response Example
$.get("https://peoplejsonendpoint.com", (data) =>
	// Append to Selector
	peopleSection.appendChild(list(data));
);
```

**Result**

```html
<div class="people-section">
  <ul class="people">
    <li class="person">Brian is 100 years old, lives in boonies and is good at beer drinking!</li>
		<li class="person">Jason is 18 years old, lives in west boonies and is good at push ups!</li>
		<li class="person">Josh is 25 years old, lives in awesomeville and is good at dunking balls!</li>
  </ul>
</div>
```