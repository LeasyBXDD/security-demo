<template>
    <div>
        <h1>VP Sentinel 安全声纹识别模型</h1>
    </div>
    <div class='typora-export-content'>
        <div id='write' class=''>
            <h2 id='系统介绍'><span style="font-weight: bolder;">系统介绍</span></h2>
            <p>本项目利用生成<span style="font-weight: bold;">对抗网络（GAN）、CLEVER算法、声纹样本变换和分类器</span>等技术，
                在移动端和Web端实现了一种相比于现有的声纹识别模型具备<span style="font-weight: bold;">更强抗对抗样本攻击</span>能力，
                且可以识别出<span style="font-weight: bold;">对抗样本中原始信息</span>的声纹识别系统。
                当判别器识别出被人为添加扰动的对抗样本时，系统通过CLEVER算法对对抗样本进行样本恢复，识别样本中的原始信息。
            </p>
            <p><span>本系统已经部署在移动端和Web端。系统运行流程如图1所示。</span></p>
            <p><strong><img src="../../public/1.png" referrerpolicy="no-referrer" alt="img"></strong></p>
            <center style="font-weight: bolder;">图1 系统运行流程</center>
            <h2 id='22--系统设计'><span style="font-weight: bolder;">2.2 系统设计</span></h2>
            <p><span>VP
                    Sentinel是一个基于GAN和分类器防御技术的安全声纹识别系统，该系统采用了基于深度神经网络的d-vector模型来提取声纹特征，基于时延神经网络（TDNN）的声纹模型来构建声纹识别模型，采用GAN深度学习算法和分类器防御来识别对抗样本。同时在将样本输入到判别器之前，对其进行了样本变换，以便加大真实样本和对抗样本之间的内在属性差异，更有利于判别器的判别。最后我们采用了一种基于CLEVER距离恢复的对抗样本恢复方法，对对抗样本进行样本恢复，恢复对抗样本中存在的原始信息。</span>
            </p>
            <p><span>VP Sentinel系统包括以下五个模块，模块间关系如图4所示：</span></p>
            <p><span>1. 基于GAN的对抗样本生成模块</span></p>
            <p><span>2. 基于d-vector和TDNN的声纹识别模块</span></p>
            <p><span>3. 基于样本变换的样本数据增强模块</span></p>
            <p><span>4. 基于GAN的对抗样本识别模块</span></p>
            <p><span>5. 基于CLEVER距离恢复算法的对抗样本恢复模块</span></p>
            <p><img src="../../public/2.png" referrerpolicy="no-referrer" alt="img"></p>
            <center style="font-weight: bolder;">
                图1 模块关系图
            </center>
            <p><span>下面对这五个模块进行详细说明。</span></p>
            <p><strong><span style="font-weight: bolder;">1．基于GAN的对抗样本生成模块</span></strong></p>
            <p><span>对抗样本生成模块采用基于GAN的深度学习算法来生成对抗样本，对样本进行样本变换，包括随机扰动、声速扰动等操作，采用不同的生成策略[</span><a
                    href='#'><span>2</span><span>]</span></a><span> ，包括基于梯度的攻击、基于优化的攻击等策略，以增加对抗样本的多样性。用于系统的自身训练迭代。</span>
            </p>
            <p><strong><span style="font-weight: bolder;">2．基于d-vector和TDNN的声纹识别模型</span></strong></p>
            <p><span>声纹模型训练模块采用基于深度神经网络的d-vector模型来提取声纹特征，采用基于时延神经网络（TDNN）的声纹模型来构建声纹识别模型，采用多任务训练方法，同步训练d-vector模型和TDNN模型，以提高声纹识别的准确性和鲁棒性。</span>
            </p>
            <p><strong><span style="font-weight: bolder;">3.</span></strong><span> </span><strong><span
                        style="font-weight: bolder;">基于样本变换的样本数据增强模块</span></strong></p>
            <p><span>为提高对抗样本的识别准确度，本项目采用基于样本变换的数据增强模块。在样本分类前，该模块对训练数据进行多种变换，如随机裁剪、旋转、平移、缩放等操作，从而增加数据的多样性和数量。这种数据增强技术能够加大对抗样本和普通样本之间的差别，提高GAN判别器的鲁棒性与识别准确度。此外，通过控制数据增强的程度，可以避免过拟合现象的发生，提高模型的泛化能力。本模块的使用能够有效提高分类器的性能，提高对抗样本的识别率和鲁棒性。</span>
            </p>
            <p><strong><span style="font-weight: bolder;">4．基于GAN的对抗样本识别模块</span></strong></p>
            <p><span>该模块使用GAN的判别器对对抗样本和正常声纹样本进行二分类，通过对抗学习的方法来提高模型对对抗样本的识别准确率和鲁棒性。在对抗样本被检测到后，该模块将对抗样本输入CLEVER样本恢复模块，对其进行恢复，以减少对声纹识别的影响。如果未检测到对抗样本，就将声纹特征输入到声纹识别模块。</span>
            </p>
            <p><strong><span style="font-weight: bolder;">5．基于CLEVER距离恢复算法的对抗样本恢复模块</span></strong></p>
            <p><span>对抗样本恢复模块采用基于CLEVER距离恢复的对抗样本恢复方法，通过最小化原始样本和对抗样本之间的CLEVER距离，来恢复对抗样本中存在的原始信息，采用迭代优化方法进行恢复，将对抗样本输入到优化器中，通过反向传播和梯度下降等方法，逐步恢复原始信息。</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "AboutView",
};
</script>

<style scoped>
html {
    overflow-x: initial !important;
}

:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --select-text-bg-color: #B5D6FC;
    --select-text-font-color: auto;
    --monospace: "Lucida Console", Consolas, "Courier", monospace;
    --title-bar-height: 20px;
}

.mac-os-11 {
    --title-bar-height: 28px;
}

html {
    font-size: 14px;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4,
h5 {
    white-space: pre-wrap;
}

body {
    margin: 0px;
    padding: 0px;
    height: auto;
    inset: 0px;
    font-size: 1rem;
    line-height: 1.42857;
    overflow-x: hidden;
    background: inherit;
    tab-size: 4;
}

iframe {
    margin: auto;
}

a.url {
    word-break: break-all;
}

a:active,
a:hover {
    outline: 0px;
}

.in-text-selection,
::selection {
    text-shadow: none;
    background: var(--select-text-bg-color);
    color: var(--select-text-font-color);
}

#write {
    margin: 0px auto;
    height: auto;
    width: inherit;
    word-break: normal;
    overflow-wrap: break-word;
    position: relative;
    white-space: normal;
    overflow-x: visible;
    padding-top: 36px;
}

#write.first-line-indent p {
    text-indent: 2em;
}

#write.first-line-indent li p,
#write.first-line-indent p * {
    text-indent: 0px;
}

#write.first-line-indent li {
    margin-left: 2em;
}

.for-image #write {
    padding-left: 8px;
    padding-right: 8px;
}

body.typora-export {
    padding-left: 30px;
    padding-right: 30px;
}

.typora-export .footnote-line,
.typora-export li,
.typora-export p {
    white-space: pre-wrap;
}

.typora-export .task-list-item input {
    pointer-events: none;
}

@media screen and (max-width: 500px) {
    body.typora-export {
        padding-left: 0px;
        padding-right: 0px;
    }

    #write {
        padding-left: 20px;
        padding-right: 20px;
    }
}

#write li>figure:last-child {
    margin-bottom: 0.5rem;
}

#write ol,
#write ul {
    position: relative;
}

img {
    max-width: 100%;
    vertical-align: middle;
    image-orientation: from-image;
}

button,
input,
select,
textarea {
    color: inherit;
    font: inherit;
}

input[type="checkbox"],
input[type="radio"] {
    line-height: normal;
    padding: 0px;
}

*,
::after,
::before {
    box-sizing: border-box;
}

#write h1,
#write h2,
#write h3,
#write h4,
#write h5,
#write h6,
#write p,
#write pre {
    width: inherit;
}

#write h1,
#write h2,
#write h3,
#write h4,
#write h5,
#write h6,
#write p {
    position: relative;
}

p {
    line-height: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    break-after: avoid-page;
    break-inside: avoid;
    orphans: 4;
}

p {
    orphans: 4;
}

h1 {
    font-size: 2rem;
}

h2 {
    font-size: 1.8rem;
}

h3 {
    font-size: 1.6rem;
}

h4 {
    font-size: 1.4rem;
}

h5 {
    font-size: 1.2rem;
}

h6 {
    font-size: 1rem;
}

.md-math-block,
.md-rawblock,
h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.hidden {
    display: none;
}

.md-blockmeta {
    color: rgb(204, 204, 204);
    font-weight: 700;
    font-style: italic;
}

a {
    cursor: pointer;
}

sup.md-footnote {
    padding: 2px 4px;
    background-color: rgba(238, 238, 238, 0.7);
    color: rgb(85, 85, 85);
    border-radius: 4px;
    cursor: pointer;
}

sup.md-footnote a,
sup.md-footnote a:hover {
    color: inherit;
    text-transform: inherit;
    text-decoration: inherit;
}

#write input[type="checkbox"] {
    cursor: pointer;
    width: inherit;
    height: inherit;
}

figure {
    overflow-x: auto;
    margin: 1.2em 0px;
    max-width: calc(100% + 16px);
    padding: 0px;
}

figure>table {
    margin: 0px;
}

thead,
tr {
    break-inside: avoid;
    break-after: auto;
}

thead {
    display: table-header-group;
}

table {
    border-collapse: collapse;
    border-spacing: 0px;
    width: 100%;
    overflow: auto;
    break-inside: auto;
    text-align: left;
}

table.md-table td {
    min-width: 32px;
}

.CodeMirror-gutters {
    border-right: 0px;
    background-color: inherit;
}

.CodeMirror-linenumber {
    user-select: none;
}

.CodeMirror {
    text-align: left;
}

.CodeMirror-placeholder {
    opacity: 0.3;
}

.CodeMirror pre {
    padding: 0px 4px;
}

.CodeMirror-lines {
    padding: 0px;
}

div.hr:focus {
    cursor: none;
}

#write pre {
    white-space: pre-wrap;
}

#write.fences-no-line-wrapping pre {
    white-space: pre;
}

#write pre.ty-contain-cm {
    white-space: normal;
}

.CodeMirror-gutters {
    margin-right: 4px;
}

.md-fences {
    font-size: 0.9rem;
    display: block;
    break-inside: avoid;
    text-align: left;
    overflow: visible;
    white-space: pre;
    background: inherit;
    position: relative !important;
}

.md-fences-adv-panel {
    width: 100%;
    margin-top: 10px;
    text-align: center;
    padding-top: 0px;
    padding-bottom: 8px;
    overflow-x: auto;
}

#write .md-fences.mock-cm {
    white-space: pre-wrap;
}

.md-fences.md-fences-with-lineno {
    padding-left: 0px;
}

#write.fences-no-line-wrapping .md-fences.mock-cm {
    white-space: pre;
    overflow-x: auto;
}

.md-fences.mock-cm.md-fences-with-lineno {
    padding-left: 8px;
}

.CodeMirror-line,
twitterwidget {
    break-inside: avoid;
}

svg {
    break-inside: avoid;
}

.footnotes {
    opacity: 0.8;
    font-size: 0.9rem;
    margin-top: 1em;
    margin-bottom: 1em;
}

.footnotes+.footnotes {
    margin-top: 0px;
}

.md-reset {
    margin: 0px;
    padding: 0px;
    border: 0px;
    outline: 0px;
    vertical-align: top;
    background: 0px 0px;
    text-decoration: none;
    text-shadow: none;
    float: none;
    position: static;
    width: auto;
    height: auto;
    white-space: nowrap;
    cursor: inherit;
    -webkit-tap-highlight-color: transparent;
    line-height: normal;
    font-weight: 400;
    text-align: left;
    box-sizing: content-box;
    direction: ltr;
}

li div {
    padding-top: 0px;
}

blockquote {
    margin: 1rem 0px;
}

li .mathjax-block,
li p {
    margin: 0.5rem 0px;
}

li blockquote {
    margin: 1rem 0px;
}

li {
    margin: 0px;
    position: relative;
}

blockquote> :last-child {
    margin-bottom: 0px;
}

blockquote> :first-child,
li> :first-child {
    margin-top: 0px;
}

.footnotes-area {
    color: rgb(136, 136, 136);
    margin-top: 0.714rem;
    padding-bottom: 0.143rem;
    white-space: normal;
}

#write .footnote-line {
    white-space: pre-wrap;
}

@media print {

    body,
    html {
        border: 1px solid transparent;
        height: 99%;
        break-after: avoid;
        break-before: avoid;
        font-variant-ligatures: no-common-ligatures;
    }

    #write {
        margin-top: 0px;
        border-color: transparent !important;
        padding-top: 0px !important;
        padding-bottom: 0px !important;
    }

    .typora-export * {
        -webkit-print-color-adjust: exact;
    }

    .typora-export #write {
        break-after: avoid;
    }

    .typora-export #write::after {
        height: 0px;
    }

    .is-mac table {
        break-inside: avoid;
    }

    #write>p:nth-child(1) {
        margin-top: 0px;
    }

    .typora-export-show-outline .typora-export-sidebar {
        display: none;
    }

    figure {
        overflow-x: visible;
    }
}

.footnote-line {
    margin-top: 0.714em;
    font-size: 0.7em;
}

a img,
img a {
    cursor: pointer;
}

pre.md-meta-block {
    font-size: 0.8rem;
    min-height: 0.8rem;
    white-space: pre-wrap;
    background: rgb(204, 204, 204);
    display: block;
    overflow-x: hidden;
}

p>.md-image:only-child:not(.md-img-error) img,
p>img:only-child {
    display: block;
    margin: auto;
}

#write.first-line-indent p>.md-image:only-child:not(.md-img-error) img {
    left: -2em;
    position: relative;
}

p>.md-image:only-child {
    display: inline-block;
    width: 100%;
}

#write .MathJax_Display {
    margin: 0.8em 0px 0px;
}

.md-math-block {
    width: 100%;
}

.md-math-block:not(:empty)::after {
    display: none;
}

.MathJax_ref {
    fill: currentcolor;
}

[contenteditable="true"]:active,
[contenteditable="true"]:focus,
[contenteditable="false"]:active,
[contenteditable="false"]:focus {
    outline: 0px;
    box-shadow: none;
}

.md-task-list-item {
    position: relative;
    list-style-type: none;
}

.task-list-item.md-task-list-item {
    padding-left: 0px;
}

.md-task-list-item>input {
    position: absolute;
    top: 0px;
    left: 0px;
    margin-left: -1.2em;
    margin-top: calc(1em - 10px);
    border: none;
}

.math {
    font-size: 1rem;
}

.md-toc {
    min-height: 3.58rem;
    position: relative;
    font-size: 0.9rem;
    border-radius: 10px;
}

.md-toc-content {
    position: relative;
    margin-left: 0px;
}

.md-toc-content::after,
.md-toc::after {
    display: none;
}

.md-toc-item {
    display: block;
    color: rgb(65, 131, 196);
}

.md-toc-item a {
    text-decoration: none;
}

.md-toc-inner:hover {
    text-decoration: underline;
}

.md-toc-inner {
    display: inline-block;
    cursor: pointer;
}

.md-toc-h1 .md-toc-inner {
    margin-left: 0px;
    font-weight: 700;
}

.md-toc-h2 .md-toc-inner {
    margin-left: 2em;
}

.md-toc-h3 .md-toc-inner {
    margin-left: 4em;
}

.md-toc-h4 .md-toc-inner {
    margin-left: 6em;
}

.md-toc-h5 .md-toc-inner {
    margin-left: 8em;
}

.md-toc-h6 .md-toc-inner {
    margin-left: 10em;
}

@media screen and (max-width: 48em) {
    .md-toc-h3 .md-toc-inner {
        margin-left: 3.5em;
    }

    .md-toc-h4 .md-toc-inner {
        margin-left: 5em;
    }

    .md-toc-h5 .md-toc-inner {
        margin-left: 6.5em;
    }

    .md-toc-h6 .md-toc-inner {
        margin-left: 8em;
    }
}

a.md-toc-inner {
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
}

.footnote-line a:not(.reversefootnote) {
    color: inherit;
}

.reversefootnote {
    font-family: ui-monospace, sans-serif;
}

.md-attr {
    display: none;
}

.md-fn-count::after {
    content: ".";
}

code,
pre,
samp,
tt {
    font-family: var(--monospace);
}

kbd {
    margin: 0px 0.1em;
    padding: 0.1em 0.6em;
    font-size: 0.8em;
    color: rgb(36, 39, 41);
    background: rgb(255, 255, 255);
    border: 1px solid rgb(173, 179, 185);
    border-radius: 3px;
    box-shadow: rgba(12, 13, 14, 0.2) 0px 1px 0px, rgb(255, 255, 255) 0px 0px 0px 2px inset;
    white-space: nowrap;
    vertical-align: middle;
}

.md-comment {
    color: rgb(162, 127, 3);
    opacity: 0.6;
    font-family: var(--monospace);
}

code {
    text-align: left;
    vertical-align: initial;
}

a.md-print-anchor {
    white-space: pre !important;
    border-width: initial !important;
    border-style: none !important;
    border-color: initial !important;
    display: inline-block !important;
    position: absolute !important;
    width: 1px !important;
    right: 0px !important;
    outline: 0px !important;
    background: 0px 0px !important;
    text-decoration: initial !important;
    text-shadow: initial !important;
}

.os-windows.monocolor-emoji .md-emoji {
    font-family: "Segoe UI Symbol", sans-serif;
}

.md-diagram-panel>svg {
    max-width: 100%;
}

[lang="flow"] svg,
[lang="mermaid"] svg {
    max-width: 100%;
    height: auto;
}

[lang="mermaid"] .node text {
    font-size: 1rem;
}

table tr th {
    border-bottom: 0px;
}

video {
    max-width: 100%;
    display: block;
    margin: 0px auto;
}

iframe {
    max-width: 100%;
    width: 100%;
    border: none;
}

.highlight td,
.highlight tr {
    border: 0px;
}

mark {
    background: rgb(255, 255, 0);
    color: rgb(0, 0, 0);
}

.md-html-inline .md-plain,
.md-html-inline strong,
mark .md-inline-math,
mark strong {
    color: inherit;
}

.md-expand mark .md-meta {
    opacity: 0.3 !important;
}

mark .md-meta {
    color: rgb(0, 0, 0);
}

@media print {

    .typora-export h1,
    .typora-export h2,
    .typora-export h3,
    .typora-export h4,
    .typora-export h5,
    .typora-export h6 {
        break-inside: avoid;
    }
}

.md-diagram-panel .messageText {
    stroke: none !important;
}

.md-diagram-panel .start-state {
    fill: var(--node-fill);
}

.md-diagram-panel .edgeLabel rect {
    opacity: 1 !important;
}

.md-fences.md-fences-math {
    font-size: 1em;
}

.md-fences-advanced:not(.md-focus) {
    padding: 0px;
    white-space: nowrap;
    border: 0px;
}

.md-fences-advanced:not(.md-focus) {
    background: inherit;
}

.typora-export-show-outline .typora-export-content {
    max-width: 1440px;
    margin: auto;
    display: flex;
    flex-direction: row;
}

.typora-export-sidebar {
    width: 300px;
    font-size: 0.8rem;
    margin-top: 80px;
    margin-right: 18px;
}

.typora-export-show-outline #write {
    --webkit-flex: 2;
    flex: 2 1 0%;
}

.typora-export-sidebar .outline-content {
    position: fixed;
    top: 0px;
    max-height: 100%;
    overflow: hidden auto;
    padding-bottom: 30px;
    padding-top: 60px;
    width: 300px;
}

@media screen and (max-width: 1024px) {

    .typora-export-sidebar,
    .typora-export-sidebar .outline-content {
        width: 240px;
    }
}

@media screen and (max-width: 800px) {
    .typora-export-sidebar {
        display: none;
    }
}

.outline-content li,
.outline-content ul {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
    list-style: none;
    overflow-wrap: anywhere;
}

.outline-content ul {
    margin-top: 0px;
    margin-bottom: 0px;
}

.outline-content strong {
    font-weight: 400;
}

.outline-expander {
    width: 1rem;
    height: 1.42857rem;
    position: relative;
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
    padding-left: 4px;
}

.outline-expander::before {
    content: "";
    position: relative;
    font-family: Ionicons;
    display: inline-block;
    font-size: 8px;
    vertical-align: middle;
}

.outline-item {
    padding-top: 3px;
    padding-bottom: 3px;
    cursor: pointer;
}

.outline-expander:hover::before {
    content: "";
}

.outline-h1>.outline-item {
    padding-left: 0px;
}

.outline-h2>.outline-item {
    padding-left: 1em;
}

.outline-h3>.outline-item {
    padding-left: 2em;
}

.outline-h4>.outline-item {
    padding-left: 3em;
}

.outline-h5>.outline-item {
    padding-left: 4em;
}

.outline-h6>.outline-item {
    padding-left: 5em;
}

.outline-label {
    cursor: pointer;
    display: table-cell;
    vertical-align: middle;
    text-decoration: none;
    color: inherit;
}

.outline-label:hover {
    text-decoration: underline;
}

.outline-item:hover {
    border-color: rgb(245, 245, 245);
    background-color: var(--item-hover-bg-color);
}

.outline-item:hover {
    margin-left: -28px;
    margin-right: -28px;
    border-left: 28px solid transparent;
    border-right: 28px solid transparent;
}

.outline-item-single .outline-expander::before,
.outline-item-single .outline-expander:hover::before {
    display: none;
}

.outline-item-open>.outline-item>.outline-expander::before {
    content: "";
}

.outline-children {
    display: none;
}

.info-panel-tab-wrapper {
    display: none;
}

.outline-item-open>.outline-children {
    display: block;
}

.typora-export .outline-item {
    padding-top: 1px;
    padding-bottom: 1px;
}

.typora-export .outline-item:hover {
    margin-right: -8px;
    border-right: 8px solid transparent;
}

.typora-export .outline-expander::before {
    content: "+";
    font-family: inherit;
    top: -1px;
}

.typora-export .outline-expander:hover::before,
.typora-export .outline-item-open>.outline-item>.outline-expander::before {
    content: "−";
}

.typora-export-collapse-outline .outline-children {
    display: none;
}

.typora-export-collapse-outline .outline-item-open>.outline-children,
.typora-export-no-collapse-outline .outline-children {
    display: block;
}

.typora-export-no-collapse-outline .outline-expander::before {
    content: "" !important;
}

.typora-export-show-outline .outline-item-active>.outline-item .outline-label {
    font-weight: 700;
}

.md-inline-math-container mjx-container {
    zoom: 0.95;
}

mjx-container {
    break-inside: avoid;
}


:root {
    --side-bar-bg-color: #fafafa;
    --control-text-color: #777;
}

@include-when-export url(https://fonts.loli.net/css?family=Open+Sans:400italic,700italic,700,400&subset=latin,latin-ext);

/* open-sans-regular - latin-ext_latin */
/* open-sans-italic - latin-ext_latin */
/* open-sans-700 - latin-ext_latin */
/* open-sans-700italic - latin-ext_latin */
html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
}

body {
    font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
    color: rgb(51, 51, 51);
    line-height: 1.6;
}

#write {
    max-width: 860px;
    margin: 0 auto;
    padding: 30px;
    padding-bottom: 100px;
}

@media only screen and (min-width: 1400px) {
    #write {
        max-width: 1024px;
    }
}

@media only screen and (min-width: 1800px) {
    #write {
        max-width: 1200px;
    }
}

#write>ul:first-child,
#write>ol:first-child {
    margin-top: 30px;
}

a {
    color: #4183C4;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    line-height: 1.4;
    cursor: text;
}

h1:hover a.anchor,
h2:hover a.anchor,
h3:hover a.anchor,
h4:hover a.anchor,
h5:hover a.anchor,
h6:hover a.anchor {
    text-decoration: none;
}

h1 tt,
h1 code {
    font-size: inherit;
}

h2 tt,
h2 code {
    font-size: inherit;
}

h3 tt,
h3 code {
    font-size: inherit;
}

h4 tt,
h4 code {
    font-size: inherit;
}

h5 tt,
h5 code {
    font-size: inherit;
}

h6 tt,
h6 code {
    font-size: inherit;
}

h1 {
    font-size: 2.25em;
    line-height: 1.2;
    border-bottom: 1px solid #eee;
}

h2 {
    font-size: 1.75em;
    line-height: 1.225;
    border-bottom: 1px solid #eee;
}

/*@media print {
    .typora-export h1,
    .typora-export h2 {
        border-bottom: none;
        padding-bottom: initial;
    }

    .typora-export h1::after,
    .typora-export h2::after {
        content: "";
        display: block;
        height: 100px;
        margin-top: -96px;
        border-top: 1px solid #eee;
    }
}*/

h3 {
    font-size: 1.5em;
    line-height: 1.43;
}

h4 {
    font-size: 1.25em;
}

h5 {
    font-size: 1em;
}

h6 {
    font-size: 1em;
    color: #777;
}

p,
blockquote,
ul,
ol,
dl,
table {
    margin: 0.8em 0;
}

li>ol,
li>ul {
    margin: 0 0;
}

hr {
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
    overflow: hidden;
    box-sizing: content-box;
}

li p.first {
    display: inline-block;
}

ul,
ol {
    padding-left: 30px;
}

ul:first-child,
ol:first-child {
    margin-top: 0;
}

ul:last-child,
ol:last-child {
    margin-bottom: 0;
}

blockquote {
    border-left: 4px solid #dfe2e5;
    padding: 0 15px;
    color: #777777;
}

blockquote blockquote {
    padding-right: 0;
}

table {
    padding: 0;
    word-break: initial;
}

table tr {
    border: 1px solid #dfe2e5;
    margin: 0;
    padding: 0;
}

table tr:nth-child(2n),
thead {
    background-color: #f8f8f8;
}

table th {
    font-weight: bold;
    border: 1px solid #dfe2e5;
    border-bottom: 0;
    margin: 0;
    padding: 6px 13px;
}

table td {
    border: 1px solid #dfe2e5;
    margin: 0;
    padding: 6px 13px;
}

table th:first-child,
table td:first-child {
    margin-top: 0;
}

table th:last-child,
table td:last-child {
    margin-bottom: 0;
}

.CodeMirror-lines {
    padding-left: 4px;
}

.code-tooltip {
    box-shadow: 0 1px 1px 0 rgba(0, 28, 36, .3);
    border-top: 1px solid #eef2f2;
}

.md-fences,
code,
tt {
    border: 1px solid #e7eaed;
    background-color: #f8f8f8;
    border-radius: 3px;
    padding: 0;
    padding: 2px 4px 0px 4px;
    font-size: 0.9em;
}

code {
    background-color: #f3f4f4;
    padding: 0 2px 0 2px;
}

.md-fences {
    margin-bottom: 15px;
    margin-top: 15px;
    padding-top: 8px;
    padding-bottom: 6px;
}


.md-task-list-item>input {
    margin-left: -1.3em;
}

@media print {
    html {
        font-size: 13px;
    }

    pre {
        page-break-inside: avoid;
        word-wrap: break-word;
    }
}

.md-fences {
    background-color: #f8f8f8;
}

#write pre.md-meta-block {
    padding: 1rem;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f7f7f7;
    border: 0;
    border-radius: 3px;
    color: #777777;
    margin-top: 0 !important;
}

.mathjax-block>.code-tooltip {
    bottom: .375rem;
}

.md-mathjax-midline {
    background: #fafafa;
}

#write>h3.md-focus:before {
    left: -1.5625rem;
    top: .375rem;
}

#write>h4.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write>h5.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write>h6.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

.md-image>.md-meta {
    /*border: 1px solid #ddd;*/
    border-radius: 3px;
    padding: 2px 0px 0px 4px;
    font-size: 0.9em;
    color: inherit;
}

.md-tag {
    color: #a7a7a7;
    opacity: 1;
}

.md-toc {
    margin-top: 20px;
    padding-bottom: 20px;
}

.sidebar-tabs {
    border-bottom: none;
}

#typora-quick-open {
    border: 1px solid #ddd;
    background-color: #f8f8f8;
}

#typora-quick-open-item {
    background-color: #FAFAFA;
    border-color: #FEFEFE #e5e5e5 #e5e5e5 #eee;
    border-style: solid;
    border-width: 1px;
}

/** focus mode */
.on-focus-mode blockquote {
    border-left-color: rgba(85, 85, 85, 0.12);
}

header,
.context-menu,
.megamenu-content,
footer {
    font-family: "Segoe UI", "Arial", sans-serif;
}

.file-node-content:hover .file-node-icon,
.file-node-content:hover .file-node-open-state {
    visibility: visible;
}

.mac-seamless-mode #typora-sidebar {
    background-color: #fafafa;
    background-color: var(--side-bar-bg-color);
}

.md-lang {
    color: #b4654d;
}

/*.html-for-mac {
    --item-hover-bg-color: #E6F0FE;
}*/

#md-notification .btn {
    border: 0;
}

.dropdown-menu .divider {
    border-color: #e5e5e5;
    opacity: 0.4;
}

.ty-preferences .window-content {
    background-color: #fafafa;
}

.ty-preferences .nav-group-item.active {
    color: white;
    background: #999;
}

.menu-item-container a.menu-style-btn {
    background-color: #f5f8fa;
    background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 100%, 0));
}
</style>