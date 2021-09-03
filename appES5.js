//Course Constructor
function Course(title,instructor,image) {
    this.title=title;
    this.instructor=instructor;
    this.image=image;
}
//UI Constructor
function UI() {
    //UI üzerinden fonksiyonları eklemek için
}
    UI.prototype.addCourseToList=function (course) {
        const list=document.getElementById('course-list');

        var html=` 
        <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>               
        
        </tr> 
        `;
        list.innerHTML+=html;
    }

    //silme işlemi için

    UI.prototype.clearControls=function () {
    const title=document.getElementById('title').value="";
    const instructor=document.getElementById('instructor').value="";
    const image=document.getElementById('image').value="";
    }
    UI.prototype.deleteCourse=function (element) {
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }
    //uyarı mesajları
    UI.prototype.showAlert=function (message,className) {
        var alert=`
            <div class="alert alert-${className}">
            ${message}
            </div>        
        `;
        //Uyarıları belirli bir saniyeden sonra sayfadan kaldırma
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);

        const row=document.querySelector('.row');
        //afterBegin, beforeBegin, beforeEnd, afterEnd
        row.insertAdjacentHTML('beforeBegin',alert); //row etiketinin içerisine girmeden hemen önce uyarının verilmesi
    }
//bilgiler alınır.
document.getElementById('new-course').addEventListener('submit',function (event) {
    const title=document.getElementById('title').value;
    const instructor=document.getElementById('instructor').value;
    const image=document.getElementById('image').value;
    console.log(title,instructor,image);
    

    //Alınan bilgilere göre course sınıfında nesne oluşturma
    const course = new Course(title,instructor,image);
    //Create UI
    const ui=new UI();
    //bilgilendirme mesajlarının verilmesi
    if(title=='' || instructor=='' || image==''){
        ui.showAlert('Please complete the form','warning');
    }
    else{
        //add course to list
        ui.addCourseToList(course);
        //clear controls
        ui.clearControls();
        ui.showAlert('The course has been added','success');

    }
    event.preventDefault();
});
//delete butonuna click ekleme
document.getElementById("course-list").addEventListener('click',function (e) {
    const ui=new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('The course has been deleted','danger');
});