const User=require("../models/user");
const list=require("../models/list");
const auth=require("../controllers/userController");


const addTask = async (req, res) => {
  const { title, body } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findById(req.user.id);
    if (!existingUser) {
      return res.status(400).json({ message: "User not exists" });
    }

    // Create a new task
    const newList = new list({ title, body, user: existingUser._id });
    await newList.save();

    // Ensure the list field is an array and add the new task
    existingUser.list.push(newList._id);
    await existingUser.save();

    res.status(200).json({ title: newList.title, body: newList.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateTodo=async(req,res)=>{
try {
    const { title, body } = req.body;
    const todo = await list.findByIdAndUpdate(req.params.id, { title, body });
    todo.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
}
// Delete a todo
const deleteTodo = async (req, res) => {
    try {
      const todoId = req.params.id;
      const todo = await list.findById(todoId);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      const userId = todo.user;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.list = user.list.filter(id => id.toString() !== todoId);
          // Save the updated user object
      await user.save()
      // Delete the todo
      await list.findByIdAndDelete(todoId);
  
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


const getList = async (req, res) => {
  try {
    const todos = await list.find({ user: req.user.id }).sort({ createdAt: -1 });
    console.log(todos); // Log the todos to see what's fetched

    if (todos.length > 0) {
      res.status(200).json({ list: todos });
    } else {
      res.status(404).json({ message: 'No todos found for this user' });
    }
  } catch (error) {
    console.log(error); // Log any errors for debugging purposes
    res.status(400).json({ message: 'Error fetching todos' });
  }
};


module.exports={addTask,updateTodo,deleteTodo,getList};
