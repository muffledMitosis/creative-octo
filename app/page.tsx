'use client';
import { collection, setDoc, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { doc, getDoc, db } from '../components/firebase';



function NewRequestFlow() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    const requestsRef = collection(db, 'requests');

    console.log(data);
    let data_temp = data;
    data_temp["attachment"] = "none";

    addDoc(requestsRef, data_temp).then(e => console.log("UPLOAD COMPLETE"));
  };

  const platform_checks = [
    ["Facebook", "facebook"],
    ["Instagram", "instagram"],
    ["Twitter", "twitter"],
    ["LinkedIn", "linkedin"],
    ["Youtube", "youtube"],
    ["Print & Other", "other"]
  ];

  const software_checks = [
    "Photoshop",
    "SomeOther",
    "InDesign",
    "Canva",
    "Premire",
    "After Effects"
  ];

  function CheckGroupItem({ text, datapath }) {
    return (
      <div className="ml-4 inline">
        <label>
          {text}
          <input className="ml-2 pr-4 bg-gray-200" type="checkbox" {...register(datapath)} />
        </label>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white m-10 rounded-lg ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="">
          <br /><div className="font-bold">Task Name</div>
          <input className="bg-gray-200 px-2 py1 mb-4 w-full"
            {...register("taskName")} /><br />
        </label>

        <label>
          <div className="font-bold">Platform</div>
          {platform_checks.map(obj => {
            return (
              <CheckGroupItem text={obj[0]} datapath={"platform." + obj[1]} />
            );
          })}
        </label>

        <label className="">
          <br /><div className="font-bold mt-4">Size (Width & Height)</div>
          <input className="bg-gray-200 px-2 py1 mb-4 w-full"
            {...register("taskName")} /><br />
        </label>

        <label>
          Graphic Task
          <input className="ml-2" type="checkbox" {...register("taskType.graphicTask")} />
        </label>
        <div className="ml-4 inline">
          <label>
            Video Task
            <input className="ml-2 pr-4" type="checkbox" {...register("taskType.videoTask")} />
          </label>
        </div>

        <label>
          <div className="font-bold mt-4">Software</div>
          {software_checks.map(obj => {
            return (
              <CheckGroupItem text={obj} datapath={"software." + obj.toLowerCase()} />
            );
          })}
        </label>


        <label className="">
          <div className="font-bold mt-4">Image Copy</div>
          <input className="bg-gray-200 px-2 py1 w-full"
            {...register("imageCopy")} /><br />
        </label>

        <label className="">
          <div className="font-bold mt-4">Design Brief</div>
          {//<input className="bg-gray-200 text-left top-0 py1 mb-4 w-full h-32" type="text"
            //{...register("brief")} /><br />
          }
          <textarea className="bg-gray-200 w-full h-32"
            {...register("brief")} />
        </label>

        <label>
          <div className="font-bold mt-4">Attachments</div>
          <input type="file"
            {...register("attachment")} />
        </label>


        { // <input {...register("exampleRequired", { required: true })} />
          // {/* errors will return when field validation fails  */}
          // {errors.exampleRequired && <span>This field is required</span>} 
        }


        <div className="w-full flex flex-row justify-end mt-4">
          <div className="inline">
            <label className="m-4 bg-octo-dark-purple text-octo-yellow px-4 rounded-lg font-bold cursor-pointer">
              Submit Request & Connect With A Project Manager
              <input type="submit" value="" />

            </label>

          </div>

        </div>

      </form>
    </div>
  );
}

function ProjectTable() {
  const [loading, setLoading] = useState(true);

  function TableItem({ task, status, dueOn }) {
    return (
      <tr className="bg-gray-200">
        <td>{task}</td>
        <td>{status}</td>
        <td>{dueOn}</td>
      </tr>
    );
  }


  return (
    <div className="p-4 bg-white m-10 rounded-lg ">
      <div className="">Active Graphic Design Requests</div>
      <table className="table-auto w-full border border-red-700 border-separate border-spacing-y-3">
        <colgroup>
          <col className="w-2/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <thead>
          <tr className="text-left">
            <th>Task</th>
            <th>Status</th>
            <th>Due on</th>
          </tr>
        </thead>

        <tbody>
          <TableItem task="test task" status="complete" dueOn="2022/20/05" />
          <TableItem task="test task" status="complete" dueOn="2022/20/05" />
          <TableItem task="test task" status="complete" dueOn="2022/20/05" />
          <TableItem task="test task" status="complete" dueOn="2022/20/05" />
        </tbody>

      </table>
    </div>
  );
}

export default function Home() {

  const [addNew, setAddNew] = useState(false);

  // const docRef = doc(db, "cities", "SF");
  // getDoc(docRef).then(ds => console.log(ds.data()));

  return (
    <div className="w-full bg-octo-yellow rounded-lg pb-10">
      {// <div className="w-full border border-red-700 m-10 inline-block">
        //   lol
        // </div>
      }
      <div onClick={() => { setAddNew(true) }}
        className="bg-octo-dark-purple text-octo-yellow rounded-full p-4 py-1 inline-block ml-10">
        New Request
      </div>
      {addNew ? NewRequestFlow() : ProjectTable()}
    </div>
  );
}
