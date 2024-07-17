import { createButton, createCarousle, getProps } from "../../scripts/scripts.js";
import { generateTabName } from "../tab-name/tab-name.js";

export default function decorate(block) {
    const [parentTabName, parentTabId, child1TabName, child1TabId, child2TabName, child2TabId, prev, next, child1Type, child2Type] = getProps(block, {
        picture: true
    });
    // const names = parentTabName.split(",");
    const ids = parentTabId.split(",");
    // const child1names = child1TabName.split(",");
    // const child1ids = child1TabId.split(",");
    // const child2names = child2TabName.split(",");
    // const child2ids = child2TabId.split(",");
    const copyblock = copyElements(block);
    block.innerHTML = "";
    const child1 = generateTabName(createBlockElement([copyblock.children[2], copyblock.children[3], "", child1Type, prev, next]))
    const child2 = generateTabName(createBlockElement([copyblock.children[4], copyblock.children[5], "", child2Type, prev, next]))
    child1.dataset.id = ids[0];
    child2.dataset.id = ids[1];
    child1.classList.add("nested-tab-name-child", "active")
    child2.classList.add("nested-tab-name-child", "dp-none")
    block.append(generateTabName(createBlockElement([copyblock.children[0], copyblock.children[1], "", "", "<", ">"])));
    block.append(child1);
    block.append(child2);
}

function copyElements(el) {
    const div = document.createElement("div")
    div.innerHTML = el.innerHTML ? el.innerHTML : el;
    return div;

}
function createBlockElement(children) {
    const block = document.createElement("div");
    children.forEach(function (child) {
        block.append(copyElements(child));
    })
    return block;
}