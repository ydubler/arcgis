// Stack Imports
import React, { useState } from "react";

// React Component Imports
import Sidebar from "./Sidebar/Sidebar";

function SidebarView() {
  return (
    <>
      <div className="portfolio">
        <div className="portfolio-name">Yuri Dubler /&nbsp;</div>
        <div className="portfolio-text">Portfolio</div>
      </div>
      <div style={{ textAlign: "left", maxWidth: "800px" }}>
        <h1>Recursive Collapsing Sidebar</h1>
        The collapsing menu is based on a tree and its options and suboptions
        are displayed recursively. It can be configured to be black and white,
        or, to have a color scheme which changes based on how deep you are in
        the menu.
        <br />
        <br />
        <Sidebar
          blackAndWhite={true}
          baseColor={[90, 90, 255]}
          changeRed={-5}
          changeGreen={15}
          changeBlue={-15}
          options={[
            {
              label: "About Me",
              url: "/education",
              expanded: false,
              suboptions: [
                {
                  label: "Education",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Bachelors of CS",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Online Supplements",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Pluralsight",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Udemy",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        ,
                      ],
                    },
                  ],
                },
                {
                  label: "Hobbies",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Always Learning",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Gym & Swim",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Disc Golf",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "3d Modelling",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
              ],
            },
            {
              label: "Languages",
              url: "/languages",
              expanded: false,
              suboptions: [
                { label: "C", url: "", expanded: false, suboptions: null },
                { label: "C++", url: "", expanded: false, suboptions: null },
                { label: "C#", url: "", expanded: false, suboptions: null },
                {
                  label: "Objective-C",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Python",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "PyTorch",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Javascript",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                { label: "HTML", url: "", expanded: false, suboptions: null },
                { label: "CSS", url: "", expanded: false, suboptions: null },
              ],
            },
            {
              label: "Relevant Coursework",
              url: null,
              expanded: false,
              suboptions: [
                {
                  label: "Data Structures",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Sorting",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Insertion Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Selection Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Bubble Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Heap Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Merge Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Quick Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Heaps",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Graphs",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Breadth First Search",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Depth First Search",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Dijkstra's",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Minimum Spanning Trees",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Trees",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Algorithms",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Complexity",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Recursion",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Memoization",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Fibonacci",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Master Theorem",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Proofs",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Suffix Trees",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Minimum Spanning Trees",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Gauss/Karatsuba",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Strassen",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "FFT/Convolution",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Computer Architecture",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Logic Gates",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Combinational Logic",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Memory",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "CPU",
                          url: null,
                          expanded: false,
                          suboptions: [
                            {
                              label: "Binary Addition",
                              url: null,
                              expanded: false,
                              suboptions: null,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Parallel Computing",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Multi-Core",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "OpenMP",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "GPU",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "CUDA",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Registers",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "AVX/SSE",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Network",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "MPI",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Machine Learning",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Linear Regression",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Bayes' Theorem",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Gradient Descent",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Neural Networks",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Convolutional",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Recurrent",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            ,
            {
              label: "Web Development",
              url: "",
              expanded: false,
              suboptions: [
                {
                  label: "Front End",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "React",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Angular*",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Vue*",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Back End",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "Node",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Build Step",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "Babel",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Webpack",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Databases",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "PostgreSQL",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Security",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "HTTPS",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Authentication",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "SQL Injection",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Password Hashing",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Docker*",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Kubernetes*",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
              ],
            },
            {
              label: "Parallel Computing",
              url: "",
              expanded: false,
              suboptions: [
                {
                  label: "Multi-Core",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "OpenMP",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "GPU",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "CUDA",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Registers",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "SSE/AVX",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Cluster",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "MPI",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
              ],
            },
            {
              label: "3d Modelling",
              url: "",
              expanded: false,
              suboptions: [
                {
                  label: "Blender",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Models",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "Alligator Man",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Bird Man",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
              ],
            },
            {
              label: "Download Resume",
              url: "",
              expanded: false,
              suboptions: null,
            },
          ]}
        ></Sidebar>
        <br />
        <br />
        <Sidebar
          blackAndWhite={false}
          baseColor={[60, 150, 255]}
          changeRed={-5}
          changeGreen={15}
          changeBlue={-15}
          options={[
            {
              label: "About Me",
              url: "/education",
              expanded: false,
              suboptions: [
                {
                  label: "Education",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Bachelors of CS",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Online Supplements",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Pluralsight",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Udemy",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        ,
                      ],
                    },
                  ],
                },
                {
                  label: "Hobbies",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Always Learning",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Gym & Swim",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Disc Golf",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "3d Modelling",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
              ],
            },
            {
              label: "Languages",
              url: "/languages",
              expanded: false,
              suboptions: [
                { label: "C", url: "", expanded: false, suboptions: null },
                { label: "C++", url: "", expanded: false, suboptions: null },
                { label: "C#", url: "", expanded: false, suboptions: null },
                {
                  label: "Objective-C",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Python",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "PyTorch",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Javascript",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                { label: "HTML", url: "", expanded: false, suboptions: null },
                { label: "CSS", url: "", expanded: false, suboptions: null },
              ],
            },
            {
              label: "Relevant Coursework",
              url: null,
              expanded: false,
              suboptions: [
                {
                  label: "Data Structures",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Sorting",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Insertion Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Selection Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Bubble Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Heap Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Merge Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Quick Sort",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Heaps",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Graphs",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Breadth First Search",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Depth First Search",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Dijkstra's",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Minimum Spanning Trees",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Trees",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Algorithms",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Complexity",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Recursion",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Memoization",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Fibonacci",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Master Theorem",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Proofs",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Suffix Trees",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Minimum Spanning Trees",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Gauss/Karatsuba",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Strassen",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "FFT/Convolution",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Computer Architecture",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Logic Gates",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Combinational Logic",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Memory",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "CPU",
                          url: null,
                          expanded: false,
                          suboptions: [
                            {
                              label: "Binary Addition",
                              url: null,
                              expanded: false,
                              suboptions: null,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Parallel Computing",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Multi-Core",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "OpenMP",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "GPU",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "CUDA",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Registers",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "AVX/SSE",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                    {
                      label: "Network",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "MPI",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Machine Learning",
                  url: null,
                  expanded: false,
                  suboptions: [
                    {
                      label: "Linear Regression",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Bayes' Theorem",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Gradient Descent",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Neural Networks",
                      url: null,
                      expanded: false,
                      suboptions: [
                        {
                          label: "Convolutional",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                        {
                          label: "Recurrent",
                          url: null,
                          expanded: false,
                          suboptions: null,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            ,
            {
              label: "Web Development",
              url: "",
              expanded: false,
              suboptions: [
                {
                  label: "Front End",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "React",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Angular*",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Vue*",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Back End",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "Node",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Build Step",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "Babel",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Webpack",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Databases",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "PostgreSQL",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Security",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "HTTPS",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Authentication",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "SQL Injection",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Password Hashing",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Docker*",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Kubernetes*",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
              ],
            },
            {
              label: "Parallel Computing",
              url: "",
              expanded: false,
              suboptions: [
                {
                  label: "Multi-Core",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "OpenMP",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "GPU",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "CUDA",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Registers",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "SSE/AVX",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
                {
                  label: "Cluster",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "MPI",
                      url: null,
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
              ],
            },
            {
              label: "3d Modelling",
              url: "",
              expanded: false,
              suboptions: [
                {
                  label: "Blender",
                  url: "",
                  expanded: false,
                  suboptions: null,
                },
                {
                  label: "Models",
                  url: "",
                  expanded: false,
                  suboptions: [
                    {
                      label: "Alligator Man",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                    {
                      label: "Bird Man",
                      url: "",
                      expanded: false,
                      suboptions: null,
                    },
                  ],
                },
              ],
            },
            {
              label: "Download Resume",
              url: "",
              expanded: false,
              suboptions: null,
            },
          ]}
        ></Sidebar>
      </div>
    </>
  );
}

export default SidebarView;
