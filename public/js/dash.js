//defining dashboard functions

//posting new blog
  //when clicking post, log information to create new blog
  const postNewBlog = async(event) => {


    event.preventDefault();

    //defining items to get and manipulate

        //when clicked get blog title entered
        const title = document.querySelector('.new-blog-title').value.trim();

        //when clicked get blog content entered
        const content = document.querySelector('.new-blog-content').value.trim();

        //getting user id for who is submitting blog
            // Get the modal I put an attribute on
            const userModal = document.querySelector('.modal-content');
            // Get the data-user-id attribute I created
            const user_id = userModal.getAttribute('data-user-id');
    
    //posting contenet to the server if exists
    if (title && content) {

        //posting the information
        const response = await fetch('/api/dash/blog', {
            method: 'POST',
            body: JSON.stringify({title,content,user_id}),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        //load the latest dash again if the response is valid
        if (response.ok) {
            alert(`New blog created!`);
            document.location.replace('/api/dash');
        }
        //notify if there is a failure
        else {
            alert('Failed to Create Blog')
        }
    }
    //if no content send message to fill out info
    else {
        alert('Please fill out a title and content to post');
    }
};

//editing blog

//edit button renders straught from handlebars, this runs when the post update is clicked. 
const editBlog = async(event) => {

    // Prevent Default
    event.preventDefault();

    //get the latest title and text area inputs when button is clicked on

        //getting updated title
            //call out button when clicked
            const updateButton = event.target
                console.log(updateButton);
            //go up a parent
            const modalFooter = updateButton.parentElement;
                console.log(modalFooter);
            //go over a prior sibling
            const form = modalFooter.previousElementSibling
                console.log(form);
            //using querySelector and scope within to form the children
            const input= form.querySelector('.new-blog-title');
                console.log(input);
            //get updated Title
            const title = input.value.trim();
                console.log(title);

         //getting updated content
            //using querySelector and scope within to build on the vairable above
            const textArea= form.querySelector('.new-blog-content');
                console.log(textArea);
            //getting updated Title
            const content = textArea.value.trim();
                console.log(content);
           
        //getting user id for who is submitting blog
            //getting the modal that attribute is put on
            const modalContentContainer = form.parentElement;
                console.log(modalContentContainer);
            //getting the data-blog attribute that is created
            const blog_id = modalContentContainer.getAttribute('data-blog-id');
                console.log(blog_id);

        //rendering content to server if it exists
        if (title && content) {

            //posting information
            const response = await fetch(`/api/dash/blog/${blog_id}`, {
                method: 'PUT',
                body: JSON.stringify({title, content}),
                headers: {
                    'Content-Type': 'application/JSON',
                }
            });
            //reload latest dash if info is valid
            if (response.ok) {
                alert(`Blog successfully updated!`);
                document.location.replace('/api/dash');
            }
            //if fails send message
            else {
                alert('Failed to Update Blog')
            }
        }
        //send error message if no content exists
        else {
            alert('Please ensure you have content filled out to update. Content cannot be blank.');
        }
        
};

//delete blog

 //delete blog when delete button clicked
 const deleteBlog = async(event) => {

    // Prevent Default
    event.preventDefault();

    //clearing the variables
    let button;
    let buttonsContainer;
    let blog_id;

    //getting the id for the blog getting deleted

        //getting updated title
            //call out button when clicked
            button= event.currentTarget
                console.log(button);
            buttonsContainer = button.parentElement;
                console.log(buttonsContainer);
            blog_id = buttonsContainer.getAttribute('data-blogid');
                console.log(blog_id);
                
        //deleting blog by id
        try {
            //posting information
            const response = await fetch(`/api/dash/blog/${blog_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/JSON',
                }
            });
            //reload dash if info is valid
            if (response.ok) {
                alert(`Blog Deleted`);
                document.location.replace('/api/dash');
            }
            //send message if failure
            else {
                alert('Failed to Delete Blog')
                return;
            }
        }
        //send message if no contenet entered
        catch {
            alert('Please ensure you have content filled out to update. Content cannot be blank.');
        }
        
};

//posting comments

//reusing initial info to add on to when edit button is clicked
const postComment = async(event) => {

    // Prevent Default
    event.preventDefault();

    //getting comment blog id and user id

        //getting comment
            //calling out hte button clicked
            const postCommentButton = event.target
                console.log(postCommentButton);
            //going up one parent
            const upFromButton = postCommentButton.parentElement;
                console.log(upFromButton);
            //going up a prior sibling
            const form = upFromButton.previousElementSibling;
                console.log(form);
            //finding the sibing element that is holding the new comment
            const textArea = form.querySelector('.new-comment');
                console.log(textArea);
            //getting the trimmed value of the comments text area
            const comment = textArea.value.trim();
                console.log(comment);
            
            
        //getting the blog id
            //going up one element
            const modalDiv = form.parentElement;
            //getting blog id
            const blog_id = modalDiv.getAttribute('data-blog-id');
                console.log(blog_id);
            

        //gettign user id for user the is signed in 
         const user_id = modalDiv.getAttribute('data-currentuser-id');
            console.log(user_id);

        //rendering content to server if it exists
        if (comment) {
            //posting information
            const response = await fetch(`/api/dash/comment`, {
                method: 'POST',
                body: JSON.stringify({comment,blog_id,user_id}),
                headers: {
                    'Content-Type': 'application/JSON',
                }
            });
            //reload latest dash if info is valid
            if (response.ok) {
                document.location.replace('/api/dash');
            }
            //send message if not valid
            else {
                alert('Failed to update')
            }
        }
        
        //send message if no content to post
        else {
            alert('Please ensure you have content filled out to update. Content cannot be blank.');
        }

};

//posting new blog

 //selecting new blog button and add event listener to the run new blog function
 document.querySelector('#post-new-blog').addEventListener('click', postNewBlog);

 //edit blog

  //defining a variable holding all the button instances with class update-blog
  const editBlogButtons = document.querySelectorAll('.update-blog');

  //loop through array of buttons and add event listener in order to run edit blog function
  
  editBlogButtons.forEach(function(el) {
      el.addEventListener('click', editBlog)
  });

  //deleting blog

      //defining a variable holding all the button instances with class delete-blog
      const deleteBlogButtons = document.querySelectorAll('.delete-blog');

      //loop through array of buttons and add event listener in order to run delete blog function
      deleteBlogButtons.forEach(function(el) {
          el.addEventListener('click', deleteBlog)
      });

      //posting comment

         
     const commentBlogButtons = document.querySelectorAll('.post-comment');

     //loop through array of buttons and add event listener in order to run edit blog function
     commentBlogButtons.forEach(function(el) {
         el.addEventListener('click', postComment)
     });