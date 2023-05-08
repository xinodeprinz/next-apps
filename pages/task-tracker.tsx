import sweetAlert from '@/components/alert';
import axios from '@/components/axios';
import { addedTask, Task } from '@/components/types';
import styles from '@/styles/task-tracker.module.css';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useState } from 'react';

interface Props {
    initTasks: Task[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data }: { data: Task[] } = await axios.get('/api/tasks');
    return {
        props: { initTasks: data }
    };
}

const TodoApp = ({ initTasks }: Props) => {
    const [addTask, setAddTask] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>(initTasks);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [task, setTask] = useState<addedTask>({
        task: '',
        date: null,
        remember: false,
    });

    const toggleAddTask = () => setAddTask(addTask ? false : true);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setTask({ ...task, [target.id]: target.value });
    }

    const handleRemember = () => {
        setTask({ ...task, remember: task.remember ? false : true })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setIsCreating(true);
            e.preventDefault();
            setIsCreating(true);
            const res = await axios.post('/api/tasks/create', task);
            sweetAlert({ icon: 'success', title: 'Task created' });
            setTasks(res.data as Task[])
            setTask({
                ...task,
                task: '',
                date: null,
                remember: false,
            });
            // Emptying fields
            emptyFields();
            setIsCreating(false);
        } catch (error) {
            setIsCreating(false);
        }
    }

    const deleteTask = async (id: string) => {
        try {
            setIsDeleting(true);
            const res = await axios.delete(`/api/tasks/${id}`);
            setTasks(res.data as Task[]);
            sweetAlert({ icon: 'success', title: 'Task deleted' });
            setIsDeleting(false);
        } catch (error) {
            setIsDeleting(false);
        }
    }

    const emptyFields = () => {
        ['task', 'date', 'remember'].forEach(field => {
            const el = document.getElementById(field) as HTMLInputElement;
            if (field === 'remember') el.checked = false;
            else el.value = '';
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="border border-dark p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-capitalize">task tracker</h4>
                                <button
                                    className={`btn btn-${!addTask ? 'success' : 'danger'} text-capitalize`}
                                    onClick={toggleAddTask}
                                >
                                    {addTask ? 'close' : 'add task'}
                                </button>
                            </div> <hr />

                            {addTask && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Task</label>
                                        <input
                                            type="text"
                                            placeholder="Add Task"
                                            className="form-control"
                                            id='task'
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id='date'
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id='remember'
                                            onChange={handleRemember}
                                        />
                                        <label className="form-check-label">
                                            Set Reminder
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark w-100"
                                        disabled={isCreating ? true : false}
                                    >
                                        {isCreating ? 'Creating Task...' : 'Save Task'}
                                    </button>
                                </form>
                            )}

                            <div className="tasks mt-4">
                                {isDeleting && (
                                    <div className="text-end mb-2 text-danger">
                                        Deleting task...
                                    </div>
                                )}
                                {tasks.map(t => (
                                    <div key={t.id}
                                        className={`mb-2 p-2 d-flex justify-content-between 
                                        ${styles.task} ${t.remember ? styles.border : ''}`}
                                    >
                                        <div>
                                            <h5 className="text-capitalize">{t.task}</h5>
                                            <div>{new Date(t.date as Date).toUTCString()}</div>
                                        </div>
                                        <button
                                            className={styles.close}
                                            onClick={() => deleteTask(t.id)}
                                        >&#x2715;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoApp