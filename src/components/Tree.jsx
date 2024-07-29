import "./Tree.css"
import tree from "../assets/tree_frame.png"
import profile from "../assets/blank_profile.png"
import { user } from "../pojos/user";
import { trees } from "../pojos/trees";
import { useState } from "react";
import { getTrees } from "../database/api_call";

export default function Tree() {
  const [treeNumber, setTreeNumber] = useState(0);
  const [, setReload] = useState(false);

  if (trees.list == null) {
    getTrees()
      .then((res) => {
        trees.list = res;
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }

  function incTreeNumber() {
    if (trees.list[treeNumber+1] != null) {
      setTreeNumber(treeNumber+1);
    }
  }

  function decTreeNumber() {
    if (treeNumber == 0) {
      setTreeNumber(0);
      return;
    }
    setTreeNumber(treeNumber-1);
  }

  return (
    <div id="tree">
      <img src={ tree } alt="tree" id="tree-frame" />
      <div id="u-prof-1">
        <img src={ user.image_link ?? profile } alt="tree" className="u-prof" />
        <span>You</span>
      </div>
      {
        trees.list != null && trees.list.length != 0 && treeNumber != null ?
          trees.list[treeNumber].map((treeUser) => 
            <div key={Math.random()*999} id={`u-prof-${treeUser.index}`}>
              <img src={ treeUser.image_link ?? profile } alt="profile" className="u-prof" />
              <span>{ treeUser.name }</span>
            </div>
          ) :
          <div></div>
      }
      <span onClick={decTreeNumber} id="arrow-left" className="material-symbols-rounded">arrow_back_ios</span>
      <span onClick={incTreeNumber} id="arrow-right" className="material-symbols-rounded">arrow_forward_ios</span>
    </div>
  );
}