import React from 'react';

const Blog = () => {
    return (
        <div className='max-w-[1480px] mx-auto px-3'>
            <div>
                <h1 className='text-xl text-primary font-bold'><span>Que:</span> What are the different ways to manage a state in a React application?</h1>
                <p>
                    Ans: There are 4 types of state available in react.
                    <ol>
                        <li>Local State: Local state is most often managed in React using the useState hook. For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form's inputs.</li>
                        <li>Global State: React’s Context API simplifies the process of making data available to a large number of components, without having to manually pass that data through props at each level of your app’s component tree. <br /> There are many state management libraries out there that help you do just that, such as Redux and MobX. Mobify does not recommend any particular state-management library—and you can build a Mobify app without using one at all.</li>
                        <li>Server State: </li>
                        <li>Url State</li>
                    </ol>
                </p>
            </div>
        </div>
    );
};

export default Blog;