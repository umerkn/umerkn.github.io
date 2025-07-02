const courseList = [
    { name: "AI-101 Applications of ICT", credit: 2 },
    { name: "AI-101L Applications of ICT Lab", credit: 1 },
    { name: "AI-121 Discrete Mathematics", credit: 3 },
    { name: "AI-133 Programming Fundamentals", credit: 3 },
    { name: "AI-133L Programming Fundamentals Lab", credit: 1 },
    { name: "HU-102 Functional English", credit: 3 },
    { name: "IS-102 Islamic Studies", credit: 2 },
    { name: "MA-113 Calculus and Analytic Geometry", credit: 3 },
  ],
  gradeOptions = [
    { grade: "A+", gp: 4 },
    { grade: "A", gp: 4 },
    { grade: "A-", gp: 3.7 },
    { grade: "B+", gp: 3.3 },
    { grade: "B", gp: 3 },
    { grade: "B-", gp: 2.7 },
    { grade: "C+", gp: 2.3 },
    { grade: "C", gp: 2 },
    { grade: "C-", gp: 1.7 },
    { grade: "D", gp: 1 },
    { grade: "F", gp: 0 },
  ];
function createCourseRow(e = {}) {
  let t = document.createElement("tr"),
    a = document.createElement("td"),
    n = document.createElement("input");
  (n.type = "text"),
    (n.name = "name"),
    (n.placeholder = "Course Name"),
    (n.required = !0),
    (n.className = "course-name"),
    (n.value = e.name || ""),
    a.appendChild(n);
  let r = document.createElement("td"),
    l = document.createElement("select");
  (l.name = "credit"),
    (l.required = !0),
    (l.className = "credit-input"),
    (l.innerHTML =
      '<option value="">--</option>' +
      [1, 1.5, 2, 2.5, 3]
        .map(
          (t) =>
            `<option value="${t}" ${
              e.credit === t ? "selected" : ""
            }>${t}</option>`
        )
        .join("")),
    r.appendChild(l);
  let d = document.createElement("td"),
    i = document.createElement("select");
  (i.name = "grade"),
    (i.required = !0),
    (i.className = "grade-select"),
    (i.innerHTML =
      '<option value="">--</option>' +
      gradeOptions
        .map((e) => `<option value="${e.gp}">${e.grade}</option>`)
        .join("")),
    d.appendChild(i);
  let s = document.createElement("td"),
    o = document.createElement("div");
  (o.className = "inline-result"), s.appendChild(o);
  let c = document.createElement("td"),
    m = document.createElement("button");
  (m.type = "button"),
    (m.className = "delete-button"),
    (m.innerHTML = '<img src="/assets/icons/trash-simple.svg" alt="Delete" />'),
    m.addEventListener("click", () => t.remove()),
    c.appendChild(m),
    i.addEventListener("change", () => {
      updateInlineResult(l, i, o);
    }),
    l.addEventListener("change", () => {
      updateInlineResult(l, i, o);
    }),
    t.append(a, r, d, s, c),
    document.getElementById("courses").appendChild(t);
}
function updateInlineResult(e, t, a) {
  let n = parseFloat(e.value),
    r = parseFloat(t.value);
  isNaN(n) || isNaN(r)
    ? (a.textContent = "")
    : (a.textContent = `= ${r} \xd7 ${n} = ${(r * n).toFixed(2)}`);
}
function addCourse() {
  createCourseRow();
}
function clearCourses() {
  (document.getElementById("courses").innerHTML = ""),
    (document.getElementById("result").style.display = "none");
}
document.getElementById("gpa-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let t = document.querySelectorAll("#courses tr"),
    a = 0,
    n = 0;
  t.forEach((e) => {
    let t = parseFloat(e.querySelector('select[name="credit"]').value),
      r = parseFloat(e.querySelector('select[name="grade"]').value);
    isNaN(t) || isNaN(r) || ((n += t), (a += t * r));
  });
  let r = n ? (a / n).toFixed(2) : "0.00",
    l = document.getElementById("result");
  (l.innerHTML = `
    <table class="gpa-summary">
      <thead>
        <tr>
          <th>Total Points</th>
          <th>Total Credits</th>
          <th>GPA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${a.toFixed(2)}</td>
          <td>${n.toFixed(2)}</td>
          <td>${r}</td>
        </tr>
      </tbody>
    </table>
  `),
    (l.style.display = "block");
}),
  courseList.forEach(createCourseRow);
