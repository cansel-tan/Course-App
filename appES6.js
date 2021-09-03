//Course Constructor
class Course{
    constructor(title,instructor,image){
        this.courseId=Math.floor(Math.random()*10000);
        this.title=title;
        this.instructor=instructor;
        this.image=image;
    }
}

class Storage{
    //bilgileri local storageden alıp getirmesi için
    static getCourses(){
        let courses;
        
        //courses adında bir eleman oluşturulmuş mu?
        if(localStorage.getItem('courses')===null){
            courses=[];
        }
        else{ //bir değer varsa
            courses=JSON.parse(localStorage.getItem('courses'));//Local storage içindeki bilgiyi json olarak direkt saklayamadığımız için json string ten json objesine çevirmek için parse metodu kullanılır.
        }
        return courses;
    }
    //getCoursesten aldığı bilgileri ekranda göstermek için
    static displayCourses(){
        const courses=Storage.getCourses();
    //alınan json objelerinin ekrana yazdırılması için
        courses.forEach(course => {
            const ui=new UI();
            ui.addCourseToList(course);
        });
    }
    static addCourse(course){
        const courses=Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));//son eklediğimiz liste güncel kayıt olarak kalıcak.

    }
    static deleteCourse(element){
        if(element.classList.contains('delete')){
        //id bilgisini almak için
        const id=element.getAttribute('data-id');
        
        const courses=Storage.getCourses();
        //storage içerisinde alınan bilgiler foreach döngüsü ile her bir kurs indexine göre silinir.
        courses.forEach((course,index)=>{
            if(course.courseId == id){
                courses.splice(index,1);
            }
        });
        localStorage.setItem('courses',JSON.stringify(courses));
        }
        
    }
}

//UI Constructor
class UI{
    
    addCourseToList(course){
        const list=document.getElementById('course-list');

        var html=` 
        <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>               
        
        </tr> 
        `;
        list.innerHTML+=html;
    }

    clearControls(){
        const title=document.getElementById('title').value="";
        const instructor=document.getElementById('instructor').value="";
        const image=document.getElementById('image').value="";
    }

    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true;
        }
    }

    showAlert(message,className){
        var alert=`
        <div class="alert alert-${className}">
        ${message}
        </div>        
    `;
    const row=document.querySelector('.row');
    //afterBegin, beforeBegin, beforeEnd, afterEnd
    row.insertAdjacentHTML('beforeBegin',alert); //row etiketinin içerisine girmeden hemen önce uyarının verilmesi

    //Uyarıları belirli bir saniyeden sonra sayfadan kaldırma
    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);
}
}

document.addEventListener('DOMContentLoaded',Storage.displayCourses);//Eğer ekranda bir kurs varsa görünür hale gelir.
//bilgiler alınır.
document.getElementById('new-course').addEventListener('submit',function (event) {
    const title=document.getElementById('title').value;
    const instructor=document.getElementById('instructor').value;
    const image=document.getElementById('image').value;
    
    //Alınan bilgilere göre course sınıfında nesne oluşturma
    const course = new Course(title,instructor,image);
    
    //Create UI
    const ui=new UI();
    //bilgilendirme mesajlarının verilmesi
    if(title==='' || instructor==='' || image===''){
        ui.showAlert('Please complete the form','warning');
    }
    else{
        //add course to list
        ui.addCourseToList(course);
        //save to localstorage
        Storage.addCourse(course);
        //clear controls
        ui.clearControls();
        ui.showAlert('The course has been added','success');

    }
    event.preventDefault();
});
//delete butonuna click ekleme
document.getElementById("course-list").addEventListener('click',function (e) {
    const ui=new UI();
    //delete course
    if(ui.deleteCourse(e.target)==true){
        //delete from localstorage
        Storage.deleteCourse(e.target);
        ui.showAlert('The course has been deleted','danger');
    }
    
});