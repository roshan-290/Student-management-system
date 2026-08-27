let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const search = document.getElementById("search");

// Display Students

function displayStudents(list = students) {

    table.innerHTML = "";

    list.forEach((student, index) => {

        table.innerHTML += `
        <tr>

            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>

            <td>

                <button class="action-btn edit-btn"
                    onclick="editStudent(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="action-btn delete-btn"
                    onclick="deleteStudent(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    totalStudents.textContent = students.length;

    localStorage.setItem("students", JSON.stringify(students));

}

// Add Student

form.addEventListener("submit", function(e){

    e.preventDefault();

    const student = {

        id: document.getElementById("studentId").value,

        name: document.getElementById("name").value,

        age: document.getElementById("age").value,

        gender: document.getElementById("gender").value,

        course: document.getElementById("course").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value

    };

    if(editIndex === -1){

        students.push(student);

    }

    else{

        students[editIndex] = student;

        editIndex = -1;

        form.querySelector("button").textContent = "Add Student";

    }

    form.reset();

    displayStudents();

});

// Delete Student

function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        displayStudents();

    }

}

// Edit Student

function editStudent(index){

    const student = students[index];

    document.getElementById("studentId").value = student.id;

    document.getElementById("name").value = student.name;

    document.getElementById("age").value = student.age;

    document.getElementById("gender").value = student.gender;

    document.getElementById("course").value = student.course;

    document.getElementById("email").value = student.email;

    document.getElementById("phone").value = student.phone;

    editIndex = index;

    form.querySelector("button").textContent = "Update Student";

}

// Search Student

search.addEventListener("keyup", function(){

    const keyword = search.value.toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(keyword) ||

        student.id.toLowerCase().includes(keyword) ||

        student.course.toLowerCase().includes(keyword)

    );

    displayStudents(filtered);

});

// Load Students

displayStudents();