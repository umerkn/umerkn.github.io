const courseList = [
  { name: "Functional English", credit: 3 },
  { name: "Calculus and Analytic Geometry", credit: 3 },
  { name: "Discrete Mathematics", credit: 2 },
  { name: "Applications of ICT", credit: 2 },
  { name: "Applications of ICT Lab", credit: 1 },
  { name: "Programming Fundamentals", credit: 3 },
  { name: "Programming Fundamentals Lab", credit: 1 },
  { name: "Islamic Studies", credit: 3 }
];

const gradeOptions = [
  { grade: "A+", gp: 4 },
  { grade: "A", gp: 4 },
  { grade: "A-", gp: 3.7 },
  { grade: "B+", gp: 3.3 },
  { grade: "B", gp: 3 },
  { grade: "B-", gp: 2.7 },
  { grade: "C+", gp: 2.3 },
  { grade: "C", gp: 2 },
  { grade: "C-", gp: 1.7 },
  { grade: "D+", gp: 1.3 },
  { grade: "D", gp: 1 },
  { grade: "F", gp: 0 },
];

function getGpaRemark(gpa) {
  if (gpa >= 3.7) return "Excellent";
  if (gpa >= 3.3) return "Very Good";
  if (gpa >= 2.7) return "Good";
  if (gpa >= 2.0) return "Satisfactory";
  return "This shows that there’s room for improvement, but it’s only one semester. You have plenty of time to bounce back, so keep going!";
}

function createCourseRow(data = {}) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.setAttribute("data-label", "Course");
  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.name = "name";
  inputName.placeholder = "Course Name";
  inputName.required = true;
  inputName.className = "course-name";
  inputName.value = data.name || "";
  tdName.appendChild(inputName);

  const tdCredit = document.createElement("td");
  tdCredit.setAttribute("data-label", "Credits");
  const selectCredit = document.createElement("select");
  selectCredit.name = "credit";
  selectCredit.required = true;
  selectCredit.className = "credit-input";
  selectCredit.innerHTML =
    '<option value="">--</option>' +
    [1, 2, 3, 4]
      .map(
        (val) =>
          `<option value="${val}" ${
            data.credit === val ? "selected" : ""
          }>${val}</option>`
      )
      .join("");
  tdCredit.appendChild(selectCredit);

  const tdGrade = document.createElement("td");
  tdGrade.setAttribute("data-label", "Grade");
  const selectGrade = document.createElement("select");
  selectGrade.name = "grade";
  selectGrade.required = true;
  selectGrade.className = "grade-select";
  selectGrade.innerHTML =
    '<option value="">--</option>' +
    gradeOptions
      .map((g) => `<option value="${g.gp}">${g.grade}</option>`)
      .join("");
  tdGrade.appendChild(selectGrade);

  const tdGP = document.createElement("td");
  tdGP.setAttribute("data-label", "GP");
  const resultDiv = document.createElement("div");
  resultDiv.className = "inline-result";
  tdGP.appendChild(resultDiv);

  const tdDelete = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-button";
  deleteBtn.innerHTML =
    '<img src="/assets/icons/trash-simple.svg" alt="Delete" />';
  deleteBtn.addEventListener("click", () => tr.remove());
  tdDelete.appendChild(deleteBtn);

  selectCredit.addEventListener("change", () =>
    updateInlineResult(selectCredit, selectGrade, resultDiv)
  );
  selectGrade.addEventListener("change", () =>
    updateInlineResult(selectCredit, selectGrade, resultDiv)
  );

  tr.append(tdName, tdCredit, tdGrade, tdGP, tdDelete);
  document.getElementById("courses").appendChild(tr);
}

function updateInlineResult(creditEl, gradeEl, outputEl) {
  const credit = parseFloat(creditEl.value);
  const gradePoint = parseFloat(gradeEl.value);
  if (isNaN(credit) || isNaN(gradePoint)) {
    outputEl.textContent = "";
  } else {
    outputEl.textContent = `= ${gradePoint} × ${credit} = ${(
      gradePoint * credit
    ).toFixed(2)}`;
  }
}

function addCourse() {
  createCourseRow();
}

function clearCourses() {
  document.getElementById("courses").innerHTML = "";
  document.getElementById("result").style.display = "none";
}

document.getElementById("gpa-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const rows = document.querySelectorAll("#courses tr");
  let totalPoints = 0;
  let totalCredits = 0;

  rows.forEach((row) => {
    const credit = parseFloat(row.querySelector('select[name="credit"]').value);
    const grade = parseFloat(row.querySelector('select[name="grade"]').value);
    if (!isNaN(credit) && !isNaN(grade)) {
      totalCredits += credit;
      totalPoints += grade * credit;
    }
  });

  const gpa = totalCredits ? totalPoints / totalCredits : 0;
  const remark = getGpaRemark(gpa);

  const resultBox = document.getElementById("result");
  resultBox.innerHTML = `
    <p><strong>Your GPA is ${gpa.toFixed(2)}</strong></p>
    <p><strong>Remark:</strong> ${remark}</p>
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
          <td>${totalPoints.toFixed(2)}</td>
          <td>${totalCredits.toFixed(2)}</td>
          <td>${gpa.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  `;
  resultBox.style.display = "block";
});

courseList.forEach(createCourseRow);
