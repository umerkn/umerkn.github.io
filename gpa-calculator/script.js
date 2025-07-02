const courseList = [
  { name: "AI-101 Applications of ICT", credit: 2 },
  { name: "AI-101L Applications of ICT Lab", credit: 1 },
  { name: "AI-121 Discrete Mathematics", credit: 3 },
  { name: "AI-133 Programming Fundamentals", credit: 3 },
  { name: "AI-133L Programming Fundamentals Lab", credit: 1 },
  { name: "HU-102 Functional English", credit: 3 },
  { name: "IS-102 Islamic Studies", credit: 2 },
  { name: "MA-113 Calculus and Analytic Geometry", credit: 3 },
];

const gradeOptions = [
  { grade: "A+", gp: 4.0 },
  { grade: "A", gp: 4.0 },
  { grade: "A-", gp: 3.7 },
  { grade: "B+", gp: 3.3 },
  { grade: "B", gp: 3.0 },
  { grade: "B-", gp: 2.7 },
  { grade: "C+", gp: 2.3 },
  { grade: "C", gp: 2.0 },
  { grade: "C-", gp: 1.7 },
  { grade: "D", gp: 1.0 },
  { grade: "F", gp: 0.0 },
];

function createCourseRow(course = {}) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Course Name";
  nameInput.required = true;
  nameInput.className = "course-name";
  nameInput.value = course.name || "";
  nameCell.appendChild(nameInput);

  const creditCell = document.createElement("td");
  const creditSelect = document.createElement("select");
  creditSelect.name = "credit";
  creditSelect.required = true;
  creditSelect.className = "credit-input";
  creditSelect.innerHTML =
    `<option value="">--</option>` +
    [1, 1.5, 2, 2.5, 3]
      .map(
        (val) =>
          `<option value="${val}" ${
            course.credit === val ? "selected" : ""
          }>${val}</option>`
      )
      .join("");
  creditCell.appendChild(creditSelect);

  const gradeCell = document.createElement("td");
  const gradeSelect = document.createElement("select");
  gradeSelect.name = "grade";
  gradeSelect.required = true;
  gradeSelect.className = "grade-select";
  gradeSelect.innerHTML =
    `<option value="">--</option>` +
    gradeOptions
      .map((g) => `<option value="${g.gp}">${g.grade}</option>`)
      .join("");
  gradeCell.appendChild(gradeSelect);

  const resultCell = document.createElement("td");
  const calc = document.createElement("div");
  calc.className = "inline-result";
  resultCell.appendChild(calc);

  const removeCell = document.createElement("td");
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "delete-button";
  removeBtn.innerHTML = `<img src="/assets/icons/trash-simple.svg" alt="Delete" />`;
  removeBtn.addEventListener("click", () => row.remove());
  removeCell.appendChild(removeBtn);

  gradeSelect.addEventListener("change", () => {
    updateInlineResult(creditSelect, gradeSelect, calc);
  });

  creditSelect.addEventListener("change", () => {
    updateInlineResult(creditSelect, gradeSelect, calc);
  });

  row.append(nameCell, creditCell, gradeCell, resultCell, removeCell);
  document.getElementById("courses").appendChild(row);
}

function updateInlineResult(creditSelect, gradeSelect, resultElement) {
  const credit = parseFloat(creditSelect.value);
  const gp = parseFloat(gradeSelect.value);
  if (!isNaN(credit) && !isNaN(gp)) {
    resultElement.textContent = `= ${gp} × ${credit} = ${(gp * credit).toFixed(
      2
    )}`;
  } else {
    resultElement.textContent = "";
  }
}

document.getElementById("gpa-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const rows = document.querySelectorAll("#courses tr");
  let totalPoints = 0;
  let totalCredits = 0;

  rows.forEach((row) => {
    const credit = parseFloat(row.querySelector('select[name="credit"]').value);
    const gp = parseFloat(row.querySelector('select[name="grade"]').value);
    if (!isNaN(credit) && !isNaN(gp)) {
      totalCredits += credit;
      totalPoints += credit * gp;
    }
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  const result = document.getElementById("result");
  result.textContent = `Total Points: ${totalPoints.toFixed(
    2
  )}\nTotal Credits: ${totalCredits.toFixed(2)}\nGPA: ${gpa}`;
  result.style.display = "block";
});

function addCourse() {
  createCourseRow();
}

function clearCourses() {
  document.getElementById("courses").innerHTML = "";
  document.getElementById("result").style.display = "none";
}

courseList.forEach(createCourseRow);
