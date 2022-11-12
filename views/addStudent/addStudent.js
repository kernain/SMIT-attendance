import {logoutfromfirebase, getClasses, uploadImage , addStudentToDb  } from "../../config/firebase.js";
// addStudentToDb

window.logout = async function () {
    try {
      await logoutfromfirebase();
      await swal({
        title: "Succesfully Logout",
        icon: "success",
        timer: 3000
      });
      window.location.href = "../../index.html"
    } catch (e) {
      console.log(e.message);
    }
  };

  window.getClassList = async function() {
    try{
       const classList = await getClasses();
       const classOption = document.getElementById("class-list");
       console.log(classList)
       for(let item of classList){
           classOption.insertAdjacentHTML('afterend', `
           <option value="${item.sectionName}">${item.sectionName}</option>`);
       }

    }catch(e){
        console.log(e.message)
    }
  }

  getClassList();

// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})





// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})



sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})




// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})



window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})




window.addStudent = async function(){ 
    const studentName = document.getElementById("student-name").value;
    const fatherName = document.getElementById("father-name").value;
    const rollNo = document.getElementById("roll-number").value;
    const contactNo = document.getElementById("contact-no").value;
    const cnicnNo = document.getElementById("cnic-no").value;
    const courseName = document.getElementById("course-name").value;
    const sectionName = document.getElementById("class-name").value;
    const image = document.getElementById("img").files[0];

    try{
        const imgResult = await uploadImage(image)
        await addStudentToDb(studentName, fatherName, rollNo, contactNo, cnicnNo, courseName, sectionName, imgResult);
        swal({
            title: "Student Successfully Added!",
            icon: "success",
            timer: 3000
        });
    }catch(e){
        console.log(e.message)
    }
}