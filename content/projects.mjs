// Project content and original media from the supplied materials.
import { intelligentSystems } from './systems.mjs';
export const projects = [
  ...intelligentSystems,
  {
    "id": "kangaroo",
    "title": {
      "zh": "大模型驱动的子母车跨室内外物流配送系统",
      "en": "LLM-driven macro–micro robot delivery across indoor and outdoor environments"
    },
    "summary": {
      "zh": "面向跨室内外配送，以大模型规划与 SLAM、RTK、MPC 协调子母车，实机验证跨尺度运输、交接与末端导航。",
      "en": "For cross-environment delivery, language-model planning coordinates macro–micro robots with SLAM, RTK, and MPC; real robots demonstrate transport, handoff, and final navigation."
    },
    "facts": [
      {
        "label": {
          "zh": "项目时间",
          "en": "Period"
        },
        "value": {
          "zh": "2024.08—2025.06",
          "en": "Aug 2024–Jun 2025"
        }
      },
      {
        "label": {
          "zh": "本人职责",
          "en": "Role"
        },
        "value": {
          "zh": "主要研发成员",
          "en": "Research and development contributor"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "室外道路、大厅、窄通道和房间对机器人尺寸与通行能力的要求不同。单一移动平台难以同时兼顾长距离运输与室内末端任务，因此采用大小载具协作衔接不同尺度环境。",
            "en": "Outdoor roads, halls, narrow passages, and rooms impose different size and mobility requirements. A macro–micro team links long-distance transport with the final indoor task."
          },
          {
            "zh": "母车具有运输效率和传感器搭载空间，子车具有狭窄区域通行能力；协作的难点在于让两者在合适的位置交接，并保持任务语义、地图位置与执行状态一致。系统因此同时处理语言层面的任务分解和物理层面的跨平台衔接。",
            "en": "The larger vehicle offers transport capacity and room for sensors, while the smaller vehicle can enter confined areas. Coordinating their handoff requires consistency between task intent, map locations, and execution state, linking language-level planning with physical cooperation."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "用户通过自然语言提出配送或导航需求，系统将其分解为母车移动、子车卸载、进入目标区域和协同返回等动作。典型任务涵盖大厅至小房间以及室外道路至窄路。",
            "en": "The system translates natural-language requests into vehicle movement, micro-vehicle unloading, target-area entry, and coordinated return. Tasks span a large hall to a small room and outdoor roads to narrow paths."
          },
          {
            "zh": "执行过程按照“理解需求—分配载具—前往交接点—卸载与末端导航—返回对接”组织。母车无法进入目标区域时，由子车继续完成末端任务；执行反馈用于检查动作前置条件和计划是否与当前状态匹配。",
            "en": "Execution follows request interpretation, vehicle assignment, travel to a handoff location, unloading and final navigation, and return docking. The micro vehicle completes the final stage where the macro vehicle cannot enter; feedback checks action prerequisites against the current state."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/kangaroo-scenario.webp",
            "caption": {
              "zh": "跨尺度、跨室内外的子母车协作任务",
              "en": "Macro–micro collaboration across scales and environments"
            }
          }
        ]
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot platforms"
        },
        "paragraphs": [
          {
            "zh": "母车搭载 Robosense Helios 16 三维激光雷达、N100 IMU、ZED-F9P GPS-RTK、车载计算单元和电动滑轨；子车搭载 RealSense 相机、RPLIDAR A3 与车载计算单元。母车负责大范围运输，子车进入狭窄目标区域。",
            "en": "The macro vehicle carries a Robosense Helios 16 LiDAR, N100 IMU, ZED-F9P GPS-RTK, onboard computer, and an electric sliding rail. The micro vehicle uses a RealSense camera, RPLIDAR A3, and an onboard computer for access to confined targets."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/kangaroo-platform.webp",
            "caption": {
              "zh": "论文中的子母车设备配置与尺寸",
              "en": "Robot hardware and dimensions from the paper"
            },
            "role": "main"
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "系统分为语言任务规划与双车导航执行两层，由执行反馈连接高层需求和底层控制。",
            "en": "The system separates language-level task planning from vehicle navigation and connects them through execution feedback."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/kangaroo-architecture.webp",
            "caption": {
              "zh": "语言反馈规划、双车导航与协同执行架构",
              "en": "Language feedback planning and coordinated vehicle navigation"
            }
          },
          {
            "src": "assets/papers/kangaroo-ifplanner.webp",
            "caption": {
              "zh": "迭代反馈规划器",
              "en": "Iterative feedback planner"
            },
            "displayWidth": 620
          }
        ],
        "layout": "full",
        "techniques": [
          {
            "name": {
              "zh": "IF-Planner 反馈规划",
              "en": "IF-Planner feedback planning"
            },
            "description": {
              "zh": "把自然语言需求组织为带前置条件的运动原语，结合规则检查与执行状态修正规划，处理运输、卸载、末端导航和返回之间的依赖。",
              "en": "Translate language requests into motion primitives with preconditions, then use rule checks and execution state to revise dependencies between transport, unloading, final navigation, and return."
            }
          },
          {
            "name": {
              "zh": "多传感器定位与 MPC",
              "en": "Multi-sensor localization and MPC"
            },
            "description": {
              "zh": "按场景衔接 RTK、激光/惯性 SLAM 与模型预测控制，将室外大范围运输和室内狭窄区域导航转换为底盘可执行的运动指令。",
              "en": "Connect RTK, LiDAR–inertial SLAM, and model predictive control across environments, turning large-area transport and confined indoor navigation into executable base commands."
            }
          },
          {
            "name": {
              "zh": "双车通信与装卸对接",
              "en": "Vehicle communication and docking"
            },
            "description": {
              "zh": "交换两车的定位、任务及执行状态，协调电动载台装卸与视觉–LiDAR 对接，使独立导航模块按交接顺序协同运行。",
              "en": "Exchange localization, task, and execution state, coordinating powered loading and visual–LiDAR docking so the two navigation modules follow a shared handoff sequence."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "以下片段直接从室外道路与狭窄通道中的实机导航开始，展示跨环境行驶和建筑入口通行。其他母车配置的装卸与对接演示放在页面末尾。",
            "en": "The clip starts with physical navigation on an outdoor road and a narrow path, showing cross-environment movement and building access. Loading and docking with other macro-vehicle configurations appear last."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/kangaroo/outdoor.mp4",
            "poster": "assets/projects/kangaroo/outdoor.poster.webp",
            "caption": {
              "zh": "室外道路—狭窄通道：跨环境行驶与建筑入口通行",
              "en": "Outdoor road–narrow path: cross-environment navigation and building access"
            }
          }
        ]
      },
      {
        "id": "experiments",
        "title": {
          "zh": "实验",
          "en": "Experiments"
        },
        "paragraphs": [
          {
            "zh": "在 VastHall–TinyRoom 与 OutdoorRoad–NarrowPath 两类真实场景中，按直接/间接表达以及单/多需求形成四类任务。完整系统在两类场景中的成功率分别为 85–88% 和 78–81%。",
            "en": "Real-world evaluation covers VastHall–TinyRoom and OutdoorRoad–NarrowPath, with four task types combining direct/indirect expressions and single/multiple demands. Success ranges from 85–88% and 78–81%, respectively."
          },
          {
            "zh": "在间接多需求任务中，加入反馈后，VastHall–TinyRoom 的成功率由 33% 提升至 85%，OutdoorRoad–NarrowPath 由 30% 提升至 78%。独立导航模块测试中，母车导航成功率为 92.7%，子车为 100%。",
            "en": "For indirect multiple-demand tasks, feedback raises success from 33% to 85% in VastHall–TinyRoom and from 30% to 78% in OutdoorRoad–NarrowPath. Separate navigation-module evaluation obtains 92.7% success for the macro vehicle and 100% for the micro vehicle."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/kangaroo-results.webp",
            "caption": {
              "zh": "论文原表：不同环境与任务复杂度的成功率。",
              "en": "Original paper table: success across environments and task complexity."
            },
            "kind": "table",
            "displayWidth": 900
          }
        ],
        "metrics": []
      },
      {
        "id": "transfer",
        "title": {
          "zh": "不同设备的迁移演示",
          "en": "Transfer to other robot platforms"
        },
        "paragraphs": [
          {
            "zh": "将子母车协同流程迁移到不同母车与载台配置，展示运输、装卸、对接及室内行驶。",
            "en": "The cooperative workflow is transferred to different macro vehicles and carrier configurations, with transport, loading, docking, and indoor travel."
          }
        ],
        "figures": [
          {
            "video": "assets/projects/kangaroo/ppt-06.mp4",
            "poster": "assets/projects/kangaroo/ppt-06.poster.webp",
            "caption": {
              "zh": "不同设备迁移：轮式母车与子车对接及室内执行",
              "en": "Platform transfer: wheeled macro vehicle, docking, and indoor execution"
            }
          },
          {
            "video": "assets/projects/kangaroo/demo.mp4",
            "poster": "assets/projects/kangaroo/poster.webp",
            "caption": {
              "zh": "不同设备迁移：原主页展示的装卸、对接与室内行驶片段",
              "en": "Platform transfer: the loading, docking, and indoor-travel clip previously shown on the homepage"
            }
          }
        ]
      }
    ],
    "categoryKey": "navigation",
    "category": {
      "zh": "跨环境协作导航",
      "en": "Cross-environment navigation"
    },
    "year": "2024–2025",
    "media": {
      "video": "assets/projects/kangaroo/outdoor.mp4",
      "poster": "assets/projects/kangaroo/outdoor.poster.webp",
      "alt": {
        "zh": "室外道路—狭窄通道：跨环境行驶与建筑入口通行",
        "en": "Outdoor road–narrow path: cross-environment navigation and building access"
      }
    },
    "relatedPapers": [
      "kangaroo-paper"
    ],
    "period": {
      "zh": "2024.08—2025.06",
      "en": "Aug 2024–Jun 2025"
    },
    "group": "primary"
  },
  {
    "id": "library-robot",
    "title": {
      "zh": "四足移动操作机器人跨楼层图书整理与自主取放系统",
      "en": "Quadruped mobile manipulation for cross-floor book organization and pick-and-place"
    },
    "summary": {
      "zh": "面向多楼层图书整理与自主取放，融合激光惯性 SLAM、书脊视觉识别和抓取规划；实机图书识别率96%，任务成功率89%。",
      "en": "For cross-floor book organization and autonomous pick-and-place, LiDAR–inertial SLAM, visual book-spine recognition, and grasp planning achieve 96% book recognition and 89% task success on the robot."
    },
    "facts": [
      {
        "label": {
          "zh": "项目时间",
          "en": "Period"
        },
        "value": {
          "zh": "2023.02—2024.07",
          "en": "Feb 2023–Jul 2024"
        }
      },
      {
        "label": {
          "zh": "合作单位",
          "en": "Partner"
        },
        "value": {
          "zh": "深圳理工大学",
          "en": "Shenzhen University of Advanced Technology"
        }
      },
      {
        "label": {
          "zh": "本人职责",
          "en": "Role"
        },
        "value": {
          "zh": "主要研发成员",
          "en": "Research and development contributor"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "阶梯式或多楼层图书馆中，图书整理需要在楼层、书架和取放位置之间连续移动。项目以四足机器人的楼梯通行能力结合机械臂操作，连接跨楼层运输和图书整理。",
            "en": "Stepped and multi-floor libraries require robots to move between floors, shelves, and manipulation poses. A quadruped carries an arm to connect stair traversal with book organization."
          },
          {
            "zh": "图书馆任务还要求机器人从“到达书架”进一步完成“对准目标书籍并可靠取放”。跨楼层移动、近架定位和机械臂作业的误差会逐级影响末端执行，因此需要将移动能力与视觉、抓取和反馈控制共同设计。",
            "en": "Reaching a shelf is only the first step: the robot must align with a particular book and manipulate it reliably. Errors in floor traversal, shelf-side localization, and arm motion affect final execution, motivating joint design of mobility, perception, grasping, and feedback."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/library-robot/ppt-12.mp4",
            "poster": "assets/projects/library-robot/ppt-12.poster.webp",
            "caption": {
              "zh": "多层智慧图书馆应用场景动画",
              "en": "Multi-floor smart-library application animation"
            }
          }
        ]
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "接收取书或放书任务后，机器人定位目标书架与书籍，移动到操作位置，生成抓取或插入位姿并执行取放。跨楼层时需要保持平台与运送物品稳定，并在到达书架后完成对位。",
            "en": "Given a retrieval or return request, the robot localizes the shelf and book, moves to an operation pose, plans grasp or insertion poses, and executes the action. Floor transitions require stable transport, followed by shelf alignment."
          },
          {
            "zh": "任务链分为跨楼层接近、书架前定位、视觉确定目标、机械臂取放及作业后转移。楼梯识别和环境建图支撑移动，目标三维位置与夹持反馈支撑近距离操作，连接楼层间运输与书架端的具体作业。",
            "en": "The workflow comprises cross-floor approach, shelf-side positioning, target perception, arm pick-and-place, and departure. Stair recognition and mapping support travel, while 3D target localization and gripper feedback support manipulation, connecting floor-to-floor transport with shelf-side work."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "四足平台采用云深处机器人，配合睿尔曼机械臂、Livox 三维激光雷达和 RealSense 相机。激光雷达与惯性信息服务于建图定位，相机服务于书架与书籍感知。",
            "en": "The platform combines a DEEP Robotics quadruped, a RealMan arm, Livox 3D LiDAR, and RealSense sensing. LiDAR and inertial data support mapping and localization; cameras observe shelves and books."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/library-robot/ppt/summary-image55.webp",
            "caption": {
              "zh": "四足平台与传感器布局",
              "en": "Quadruped platform and sensor layout"
            },
            "role": "main"
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "移动导航与近架操作分别处理平台到位和书籍取放，通过统一任务流程交换目标与执行状态。",
            "en": "Navigation handles platform arrival and manipulation handles shelf-side book operations, sharing goals and execution state through a common workflow."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/library-robot/ppt/summary-image66.webp",
            "caption": {
              "zh": "图书管理机器人的导航与取放系统框架",
              "en": "Navigation and book-handling architecture shown in the slides"
            }
          }
        ],
        "flow": [
          {
            "zh": "Livox / IMU / RGB-D感知",
            "en": "Livox / IMU / RGB-D sensing"
          },
          {
            "zh": "SLAM定位与三维建图",
            "en": "SLAM and 3D mapping"
          },
          {
            "zh": "Nav2移动导航",
            "en": "Nav2 mobile navigation"
          },
          {
            "zh": "书架与书本位姿估计",
            "en": "Shelf and book pose estimation"
          },
          {
            "zh": "MoveIt 2抓取与取放",
            "en": "MoveIt 2 grasping and placement"
          }
        ],
        "techniques": [
          {
            "name": {
              "zh": "ROS 2、Nav2 与激光惯性 SLAM",
              "en": "ROS 2, Nav2, and LiDAR–inertial SLAM"
            },
            "description": {
              "zh": "点云与惯性信息用于定位建图，Nav2 组织目标导航、路径规划和避障；楼梯与障碍感知为跨楼层通行提供环境约束。",
              "en": "Use point clouds and inertial measurements for mapping and localization, with Nav2 organizing goal navigation, path planning, and obstacle avoidance. Stair and obstacle perception supplies traversal constraints."
            }
          },
          {
            "name": {
              "zh": "书脊视觉识别与三维定位",
              "en": "Book-spine recognition and 3D localization"
            },
            "description": {
              "zh": "从书架画面中检测书脊与目标书籍，将视觉位置与深度信息关联，形成机械臂坐标系下的取放目标。",
              "en": "Detect book spines and target books in shelf images, associate observations with depth, and express pick-and-place targets in the arm coordinate frame."
            }
          },
          {
            "name": {
              "zh": "MoveIt 2 与视觉/夹持反馈",
              "en": "MoveIt 2 with visual and gripper feedback"
            },
            "description": {
              "zh": "利用抓取位姿、逆运动学和运动规划生成机械臂轨迹；视觉伺服、夹持反馈与重试流程处理近架定位和操作误差。",
              "en": "Use grasp poses, inverse kinematics, and motion planning to produce arm trajectories; visual servoing, gripper feedback, and retries address shelf-side positioning and manipulation errors."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "页面开头的场景动画说明跨楼层取送需求；以下实机片段展示样机、机械臂抓取与搬移，以及楼梯附近的移动和平台控制。导航与操作通过统一任务流程衔接。",
            "en": "The opening application animation introduces cross-floor book retrieval and delivery. The physical clips below show the prototype, arm grasping and transfer, and movement and control near stairs. A shared task workflow connects navigation and manipulation."
          },
          {
            "zh": "实机实验中，图书识别率为96%，任务成功率为89%。书脊检测提供目标书籍的位置，三维感知与抓取规划进一步连接识别结果和取放动作。",
            "en": "Real-robot experiments achieve 96% book-recognition accuracy and 89% task success. Book-spine detection provides target locations, while 3D perception and grasp planning connect recognition to pick-and-place."
          },
          {
            "zh": "下图展示书脊识别、楼梯感知和三维抓取可视化。光照变化、遮挡和复杂图书摆放是持续优化的场景因素。",
            "en": "The images show book-spine recognition, stair perception, and 3D grasp visualization. Lighting changes, occlusion, and varied book arrangements remain relevant conditions for further refinement."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/library-robot/demo.mp4",
            "poster": "assets/projects/library-robot/poster.webp",
            "caption": {
              "zh": "四足移动操作机器人取放测试（一）",
              "en": "Quadruped mobile manipulation test I"
            },
            "row": "library-pick-place"
          },
          {
            "video": "assets/projects/library-robot/ppt-14.mp4",
            "poster": "assets/projects/library-robot/ppt-14.poster.webp",
            "caption": {
              "zh": "四足机器人楼梯场景与移动测试",
              "en": "Quadruped stair-setting and mobility test"
            },
            "row": "library-pick-place"
          },
          {
            "video": "assets/projects/library-robot/ppt-16.mp4",
            "poster": "assets/projects/library-robot/ppt-16.poster.webp",
            "caption": {
              "zh": "楼梯场景中的四足平台控制",
              "en": "Quadruped control in a stair setting"
            },
            "row": "library-stair-trial"
          },
          {
            "video": "assets/projects/library-robot/ppt-18.mp4",
            "poster": "assets/projects/library-robot/ppt-18.poster.webp",
            "caption": {
              "zh": "四足移动操作机器人取放测试（二）",
              "en": "Quadruped mobile manipulation test II"
            },
            "row": "library-stair-trial"
          },
          {
            "video": "assets/projects/library-robot/ppt-15.mp4",
            "poster": "assets/projects/library-robot/ppt-15.poster.webp",
            "caption": {
              "zh": "四足平台机械臂抓取与搬移",
              "en": "Arm grasping and transfer on the quadruped"
            },
            "row": "library-arm",
            "displayWidth": 720
          },
          {
            "src": "assets/projects/library-robot/book-recognition.webp",
            "caption": {
              "zh": "图书识别：书脊检测与目标书籍定位。",
              "en": "Book recognition: spine detection and target-book localization."
            },
            "row": "library-recognition-results",
            "rowWidth": 760
          },
          {
            "src": "assets/projects/library-robot/ppt/summary-image73.webp",
            "caption": {
              "zh": "机械臂三维抓取与环境感知可视化",
              "en": "3D grasp and environment visualization"
            },
            "row": "library-recognition-results",
            "rowWidth": 760
          },
          {
            "src": "assets/projects/library-robot/ppt/summary-image72.webp",
            "caption": {
              "zh": "楼梯识别流程与点云检测结果",
              "en": "Stair-recognition pipeline and point-cloud detection"
            },
            "row": "library-navigation-results",
            "rowWidth": 760
          },
          {
            "src": "assets/projects/library-robot/ppt/summary-image71.webp",
            "caption": {
              "zh": "室内三维点云地图与导航轨迹",
              "en": "Indoor point-cloud map and navigation trajectory"
            },
            "row": "library-navigation-results",
            "rowWidth": 760
          }
        ]
      }
    ],
    "categoryKey": "manipulation",
    "category": {
      "zh": "移动操作",
      "en": "Mobile manipulation"
    },
    "year": "2023–2024",
    "media": {
      "video": "assets/projects/library-robot/demo.mp4",
      "poster": "assets/projects/library-robot/poster.webp",
      "alt": {
        "zh": "四足图书馆机器人移动与操作演示",
        "en": "Quadruped library robot mobility and manipulation demo"
      }
    },
    "period": {
      "zh": "2023.02—2024.07",
      "en": "Feb 2023–Jul 2024"
    },
    "organization": {
      "zh": "深圳理工大学",
      "en": "Shenzhen University of Advanced Technology"
    },
    "group": "primary"
  },
  {
    "id": "image-goal",
    "title": {
      "zh": "SCTNav：单目视觉导航系统",
      "en": "SCTNav: Monocular Visual Navigation"
    },
    "summary": {
      "zh": "面向室内外图像目标导航，通过过去、当前与目标图像预测路点，并以单目场景几何约束 MPC；三类真实场景平均成功率为90.8%。",
      "en": "For indoor and outdoor image-goal navigation, past, current, and goal images predict waypoints while monocular scene geometry constrains MPC; average success is 90.8% across three real settings."
    },
    "facts": [
      {
        "label": {
          "zh": "导航输入",
          "en": "Inputs"
        },
        "value": {
          "zh": "历史观测、当前图像与目标图像",
          "en": "Past observations, current image, and goal image"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "图像目标导航通过目标照片指定机器人应到达的位置。项目面向低成本单目平台，研究如何在缺少直接几何目标位姿的情况下，将视觉信息转化为可执行且安全的运动。",
            "en": "Image-goal navigation specifies a destination using a photograph. The project studies how a low-cost monocular robot can turn visual information into safe motion without an explicit geometric target pose."
          },
          {
            "zh": "目标照片便于用户指定位置，但不会直接给出机器人坐标系中的距离、朝向和可行驶路径。狭窄房间中的遮挡、长走廊中的外观相似与室外光照变化，会同时影响目标识别和局部运动安全。",
            "en": "A goal photograph is easy to provide but does not directly specify distance, heading, or a traversable route in robot coordinates. Occlusion in confined rooms, repetitive corridor appearances, and outdoor lighting challenge both goal recognition and safe local motion."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/image-goal/web-all1.mp4",
            "poster": "assets/projects/image-goal/web-all1.poster.webp",
            "caption": {
              "zh": "跨场景导航总览",
              "en": "Cross-scene navigation overview"
            },
            "layout": "full"
          }
        ]
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "机器人根据行进中获取的 RGB 画面判断与目标的关系，持续预测航点并控制底盘前进，在室内走廊、障碍场景和室外道路中抵达目标图像对应的位置。",
            "en": "The robot relates incoming RGB views to the goal image, continually predicts waypoints, and controls its base toward the depicted destination in corridors, obstacle settings, and outdoor routes."
          },
          {
            "zh": "输入为历史 RGB 观测、当前 RGB 图像和目标图像，输出为连续航点与底盘控制。机器人在执行中反复更新视觉判断和局部轨迹，既要向目标推进，也要处理桌椅、墙边和道路障碍带来的空间约束。",
            "en": "Past RGB observations, the current RGB image, and a goal image are converted into waypoints and base commands. Visual estimates and local motion are updated throughout execution to make progress while accounting for spatial constraints from furniture, walls, and outdoor obstacles."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "采用自研全向移动底盘和 RealSense D435i 相机，实验关闭深度通道，仅使用单目 RGB 图像进行视觉推理与场景约束恢复。",
            "en": "A self-developed omnidirectional mobile base uses a RealSense D435i with the depth channel disabled. Visual reasoning and scene constraints use monocular RGB images only."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/image-goal/robot-platform.webp",
            "role": "main",
            "caption": {
              "zh": "自研全向移动平台与 RealSense D435i（仅使用 RGB）",
              "en": "Self-developed omnidirectional platform with RealSense D435i; RGB only"
            }
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "采用视觉路点预测与场景约束控制的分层结构，分别处理目标理解和可执行运动生成。",
            "en": "A layered architecture separates visual waypoint prediction from scene-constrained control, connecting goal understanding with executable motion."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/image-goal/web-compare.webp",
            "caption": {
              "zh": "SCTNav与端到端视觉导航方法的比较",
              "en": "SCTNav compared with end-to-end visual navigation"
            }
          },
          {
            "src": "assets/papers/sctnav-framework.webp",
            "caption": {
              "zh": "P3Net路点预测与SCMPC控制框架",
              "en": "P3Net waypoint prediction and SCMPC control"
            }
          },
          {
            "video": "assets/projects/image-goal/web-method.mp4",
            "poster": "assets/projects/image-goal/web-method.poster.webp",
            "caption": {
              "zh": "方法视频：三元时空路点预测与场景约束控制",
              "en": "Method video: ternary spatiotemporal waypoint prediction and scene-constrained control"
            }
          }
        ],
        "layout": "full",
        "techniques": [
          {
            "name": {
              "zh": "P3Net 三元时空路点预测",
              "en": "P3Net ternary spatio-temporal waypoint prediction"
            },
            "description": {
              "zh": "联合建模历史、当前与目标 RGB 图像的关系，持续预测面向目标的局部路点，以视觉时空信息减少仅凭当前外观判断方向的不确定性。",
              "en": "Model relationships among historical, current, and goal RGB views to predict local waypoints, using visual temporal context to reduce direction ambiguity."
            }
          },
          {
            "name": {
              "zh": "单目场景几何约束",
              "en": "Monocular scene geometry"
            },
            "description": {
              "zh": "从视觉观测中恢复局部可通行区域与障碍边界，为预测路点增加与真实环境几何对应的运动约束。",
              "en": "Recover local traversable space and obstacle boundaries from visual observations, grounding predicted waypoints in environmental geometry."
            }
          },
          {
            "name": {
              "zh": "SCMPC 模型预测控制",
              "en": "SCMPC model predictive control"
            },
            "description": {
              "zh": "把路点目标、场景边界和底盘运动约束纳入滚动优化，更新局部轨迹和控制指令，形成视觉感知到运动执行的闭环。",
              "en": "Optimize waypoint tracking, scene boundaries, and base-motion constraints over a receding horizon, continually updating local trajectories and control commands."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "项目页提供室内外实机、走廊导航、方法与对比演示。SCTNav 成功片段和其他方法的失败案例分别标注，用于观察不同场景下的执行行为。",
            "en": "The project page provides indoor and outdoor robot tests, corridor navigation, method videos, and comparisons. SCTNav demonstrations and baseline failure cases are labeled separately."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/image-goal/web-indoor_1.mp4",
            "poster": "assets/projects/image-goal/web-indoor_1.poster.webp",
            "caption": {
              "zh": "狭小房间实机导航 · 1",
              "en": "Confined room real-robot navigation · 1"
            }
          },
          {
            "video": "assets/projects/image-goal/web-indoor_2.mp4",
            "poster": "assets/projects/image-goal/web-indoor_2.poster.webp",
            "caption": {
              "zh": "狭小房间实机导航 · 2",
              "en": "Confined room real-robot navigation · 2"
            }
          },
          {
            "video": "assets/projects/image-goal/web-indoor_3.mp4",
            "poster": "assets/projects/image-goal/web-indoor_3.poster.webp",
            "caption": {
              "zh": "狭小房间实机导航 · 3",
              "en": "Confined room real-robot navigation · 3"
            }
          },
          {
            "video": "assets/projects/image-goal/web-corridor_1.mp4",
            "poster": "assets/projects/image-goal/web-corridor_1.poster.webp",
            "caption": {
              "zh": "长走廊实机导航 · 1",
              "en": "Long corridor real-robot navigation · 1"
            }
          },
          {
            "video": "assets/projects/image-goal/indoor.mp4",
            "poster": "assets/projects/image-goal/indoor-poster.webp",
            "caption": {
              "zh": "长走廊实机导航 · 2",
              "en": "Long corridor real-robot navigation · 2"
            }
          },
          {
            "video": "assets/projects/image-goal/web-corridor_3.mp4",
            "poster": "assets/projects/image-goal/web-corridor_3.poster.webp",
            "caption": {
              "zh": "长走廊实机导航 · 3",
              "en": "Long corridor real-robot navigation · 3"
            }
          },
          {
            "video": "assets/projects/image-goal/web-outdoor_1.mp4",
            "poster": "assets/projects/image-goal/web-outdoor_1.poster.webp",
            "caption": {
              "zh": "室外道路实机导航 · 1",
              "en": "Outdoor path real-robot navigation · 1"
            }
          },
          {
            "video": "assets/projects/image-goal/web-outdoor_2.mp4",
            "poster": "assets/projects/image-goal/web-outdoor_2.poster.webp",
            "caption": {
              "zh": "室外道路实机导航 · 2",
              "en": "Outdoor path real-robot navigation · 2"
            }
          },
          {
            "video": "assets/projects/image-goal/web-outdoor_3.mp4",
            "poster": "assets/projects/image-goal/web-outdoor_3.poster.webp",
            "caption": {
              "zh": "室外道路实机导航 · 3",
              "en": "Outdoor path real-robot navigation · 3"
            }
          }
        ],
        "source": {
          "label": {
            "zh": "演示来源：SCTNav 项目页 · CC BY-SA 4.0",
            "en": "Demonstrations: SCTNav project page · CC BY-SA 4.0"
          },
          "url": "https://anonymous.4open.science/w/SCTNav/index.html"
        }
      },
      {
        "id": "experiments",
        "title": {
          "zh": "实验与基线对比",
          "en": "Experiments and baseline comparisons"
        },
        "paragraphs": [
          {
            "zh": "训练数据来自七类模拟器或数据集，约含 8.5 万条轨迹和 250 万张 RGB 图像。仿真在未出现在训练集的四种 Gazebo 布局上评估，包含 102 组固定起终点。完整系统获得 98.0% 成功率、2.0% 碰撞率和 95.1% SPL。",
            "en": "Training uses approximately 85,000 trajectories and 2.5 million RGB images from seven simulators or datasets. Simulation evaluation uses 102 fixed start–goal pairs across four unseen Gazebo layouts. The full system reaches 98.0% success, 2.0% collision rate, and 95.1% SPL."
          },
          {
            "zh": "在三个未见真实环境中直接部署，不进行微调。每个场景包含 10 条轨迹、每条重复 4 次，共 120 次测试。受限房间、长走廊和开放校园成功率分别为 90.0%、97.5% 和 85.0%，平均为 90.8%。",
            "en": "The system transfers without fine-tuning to three unseen real-world environments. Each environment has 10 trajectories repeated four times, totaling 120 runs. Success is 90.0% in confined rooms, 97.5% in long corridors, and 85.0% on an open campus, averaging 90.8%."
          },
          {
            "zh": "P3Net 本身为 13.0M 参数，加入场景几何模块后完整系统为 347.2M 参数。系统在 i7-12700F 与 RTX 3050 的机载平台上运行，D435i 仅启用 RGB，推理无需云端。",
            "en": "P3Net has 13.0M parameters; the full system, including scene-geometry estimation, has 347.2M. It runs onboard an i7-12700F and RTX 3050 platform with only the RGB stream of a D435i enabled, without cloud inference."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/sctnav-results-original-table.webp",
            "caption": {
              "zh": "论文原表 Table II：SCTNav 的仿真、真实部署和模型规模比较。",
              "en": "Original Table II: simulation, real-world navigation, and model size."
            },
            "kind": "table",
            "displayWidth": 740
          },
          {
            "src": "assets/projects/image-goal/web-pipline.webp",
            "caption": {
              "zh": "训练数据来源、仿真与实机环境，以及关闭深度通道的单目机器人平台",
              "en": "Training sources, evaluation settings, and the monocular robot with depth disabled"
            }
          },
          {
            "src": "assets/papers/sctnav-results-scenes.webp",
            "caption": {
              "zh": "三个真实环境的成功率比较，每个环境 40 次测试。",
              "en": "Real-world success comparison, with 40 runs in each environment."
            }
          }
        ],
        "layout": "full"
      }
    ],
    "categoryKey": "navigation",
    "category": {
      "zh": "视觉导航",
      "en": "Visual navigation"
    },
    "media": {
      "video": "assets/projects/image-goal/web-indoor_1.mp4",
      "poster": "assets/projects/image-goal/web-indoor_1.poster.webp",
      "alt": {
        "zh": "SCTNav在桌椅间的真实机器人导航",
        "en": "SCTNav real-robot navigation among desks and chairs"
      }
    },
    "relatedPapers": [
      "sctnav"
    ],
    "group": "primary"
  },
  {
    "id": "patrol-inspection",
    "title": {
      "zh": "基于移动操作机器人的厂房自主巡检与设备交互系统",
      "en": "Autonomous plant inspection and equipment interaction with a mobile manipulator"
    },
    "summary": {
      "zh": "面向室内巡检与按钮交互，融合激光/RGB-D导航、YOLOv5n识别及接触校准；实机按压成功率86.67%，平均位置误差降低24.35%。",
      "en": "Indoor patrol and button pressing combine LiDAR/RGB-D navigation, YOLOv5n and contact-based pose updates; real-robot tests report 86.67% pressing success and 24.35% lower mean position error."
    },
    "facts": [
      {
        "label": {
          "zh": "项目时间",
          "en": "Period"
        },
        "value": {
          "zh": "2023.10—2024.10",
          "en": "Oct 2023–Oct 2024"
        }
      },
      {
        "label": {
          "zh": "本人职责",
          "en": "Role"
        },
        "value": {
          "zh": "核心开发；按钮识别与机械臂点击",
          "en": "Core development in button recognition and arm pressing"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "厂房与机房的巡检任务包含沿路线移动、检查固定设备和按压控制按钮。按钮分布在不同高度，机器人既要到达检查点，也要准确完成末端接触操作；长距离行驶、较大转弯和轮地滑移还会影响后续作业的定位精度。",
            "en": "Plant and machine-room inspection combines route following, checks at fixed equipment, and physical button pressing. Buttons at different heights require both mobile access and accurate arm contact. Long travel, large turns, and wheel slip can affect the pose estimate needed for later interactions."
          },
          {
            "zh": "项目采用可调高度移动平台、机械臂和低成本感知器件，利用2D激光雷达与RGB-D相机完成导航，并将已知位姿的按钮作为接触参照，在按压时更新底盘位姿，形成巡检与定位校准相互衔接的闭环。",
            "en": "A height-adjustable platform, arm, and low-cost sensors support navigation with 2D LiDAR and RGB-D observations. Buttons with configured map poses provide contact references for updating the base pose during inspection, connecting manipulation with navigation recalibration."
          }
        ]
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "机器人在预先构建的二维地图上依次访问检查点，识别红、黄、绿三类按钮并按类别执行交互。每次有效接触后，结合按钮的已知地图位姿与机械臂当前坐标变换重校准底盘，再继续下一段巡检。",
            "en": "The robot visits checkpoints on a prebuilt 2D map, recognizes red, yellow, and green buttons, and interacts according to their categories. At valid contact, the known button pose and current arm transforms recalibrate the base before the next patrol segment."
          },
          {
            "zh": "本人负责按钮识别与机械臂点击等核心环节，重点衔接视觉目标检测、三维目标坐标转换、末端接近、触碰检测和按压复位。系统整体还包括导航与位姿重校准模块。",
            "en": "My work focuses on button recognition and arm pressing: connecting visual detection, 3D target transformation, end-effector approach, contact detection, and press-and-reset execution. The complete system also contains navigation and pose-recalibration modules."
          }
        ],
        "flow": [
          {
            "zh": "导航接近检查点，调整平台高度与机械臂观察姿态。",
            "en": "Navigate to the checkpoint and adjust platform height and the arm viewing pose."
          },
          {
            "zh": "在约60°水平范围内扫描，以YOLOv5n识别按钮类别和中心位置。",
            "en": "Scan approximately 60° horizontally; YOLOv5n identifies button categories and centers."
          },
          {
            "zh": "融合RGB与深度信息得到三维操作目标，控制末端接近并检测接触。",
            "en": "Use RGB and depth to obtain the 3D target, approach it, and detect contact."
          },
          {
            "zh": "完成按钮按压与退回，利用接触时的坐标变换更新底盘位姿，再进入下一检查点。",
            "en": "Press and retract; update the base pose from contact-time transforms and continue to the next checkpoint."
          }
        ]
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "移动平台采用四轮驱动和可调高度机构，搭载ViperX 300S六自由度机械臂。升降机构与机械臂协同覆盖不同高度的设备面板；论文实验将按钮的适宜操作高度设为距地面80—120厘米。",
            "en": "A four-wheel, height-adjustable platform carries a ViperX 300S six-DOF arm. Platform height and arm motion accommodate equipment panels at different levels; the paper uses an operational button-height range of 80–120 cm above the floor."
          },
          {
            "zh": "导航感知使用LSLIDAR N10二维激光雷达和前向RealSense D435i；末端RealSense D405提供近距离RGB与深度观测，自制触碰开关检测按钮表面接触。计算单元为Intel N100小型主机，软件运行于Ubuntu 20.04与ROS Noetic，底层控制由STM32H750和CAN总线衔接。",
            "en": "Navigation uses an LSLIDAR N10 2D LiDAR and a forward RealSense D435i. An end-effector RealSense D405 supplies close-range RGB and depth, while a custom contact switch detects the button surface. An Intel N100 mini-PC runs Ubuntu 20.04 and ROS Noetic, with an STM32H750 and CAN bus for low-level control."
          }
        ],
        "figures": [
          {
            "src": "assets/projects/patrol-inspection/paper/robot-prototype.webp",
            "caption": {
              "zh": "移动巡检操作机器人样机：可调高度底盘、六自由度机械臂与末端视觉（原文Fig. 1）。",
              "en": "Prototype with an adjustable-height base, six-DOF arm, and end-effector vision (original Fig. 1)."
            },
            "role": "main",
            "displayWidth": 360
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "ROS软件分为巡航、检查操作和位姿重校准三个模块。导航观测用于路线执行与避障，末端视觉用于按钮检测与三维定位，接触时的机械臂状态则为底盘提供一次位姿校准；模块间通过ROS话题和TF坐标变换衔接。",
            "en": "The ROS architecture separates patrol navigation, inspection, and pose recalibration. Navigation observations support route following and avoidance; end-effector vision detects and localizes buttons; the arm state at contact supplies a base-pose update. ROS topics and TF transforms connect the modules."
          }
        ],
        "techniques": [
          {
            "name": {
              "zh": "RGB-D与2D激光融合",
              "en": "RGB-D and 2D LiDAR fusion"
            },
            "description": {
              "zh": "通过手眼与外参标定统一传感器坐标系，使用depthimage_to_laserscan将深度图转换为扫描数据，并与激光扫描合并。在巡检导航阶段补充单一扫描平面之外的障碍信息，更新局部代价地图。",
              "en": "Hand–eye and extrinsic calibration align sensor frames. depthimage_to_laserscan converts depth into scan data for merging with LiDAR. During patrol navigation, this adds obstacles outside the LiDAR scan plane to the local costmap."
            }
          },
          {
            "name": {
              "zh": "虚拟里程计、Gmapping与AMCL",
              "en": "Virtual odometry, Gmapping, and AMCL"
            },
            "description": {
              "zh": "laser_scan_matcher通过相邻扫描匹配生成虚拟里程计。实验先人工控制平台、仅用2D激光建立Gmapping静态地图；巡检时使用融合扫描、AMCL全局定位和虚拟里程计局部运动估计，配合ROS Navigation执行导航。",
              "en": "laser_scan_matcher estimates virtual odometry from successive scans. In the experiment, manual driving with 2D LiDAR first creates a static Gmapping map. Patrol then uses fused scans, AMCL global localization, virtual local odometry, and the ROS Navigation stack."
            }
          },
          {
            "name": {
              "zh": "YOLOv5n按钮检测与三维定位",
              "en": "YOLOv5n detection and 3D button localization"
            },
            "description": {
              "zh": "在CPU计算平台上识别按钮颜色类别与中心像素，结合D405深度和相机—机器人外参，将图像目标转换为机械臂可执行的三维目标坐标。",
              "en": "The CPU-deployed detector predicts button color categories and center pixels. D405 depth and camera-to-robot extrinsics transform image targets into executable 3D arm coordinates."
            }
          },
          {
            "name": {
              "zh": "触碰检测与定深按压",
              "en": "Contact detection and controlled pressing"
            },
            "description": {
              "zh": "末端触碰开关用于确认接触阶段。论文实现对深度估计加入3厘米接近补偿，触发开关后继续前推5毫米完成按钮按压，再退回初始姿态。",
              "en": "An end-effector switch identifies surface contact. The paper applies a 3 cm approach compensation to the depth estimate; after contact, a further 5 mm motion actuates the button before returning to the reset pose."
            }
          },
          {
            "name": {
              "zh": "基于接触与TF的底盘位姿重校准",
              "en": "Contact- and TF-based base-pose recalibration"
            },
            "description": {
              "zh": "预先记录检查按钮在地图中的位置与朝向。接触时由按钮位姿确定末端地图位姿，再与末端到底盘的TF变换组合，得到并发布新的底盘位姿，使后续导航从校准后的状态继续。",
              "en": "Each checkpoint stores the button position and orientation in the map. At contact, this reference determines the end-effector map pose. Combining it with the end-effector-to-base TF transform produces an updated base pose for subsequent navigation."
            }
          }
        ],
        "figures": [
          {
            "src": "assets/projects/patrol-inspection/paper/software-architecture.webp",
            "caption": {
              "zh": "系统软件架构：巡航、检查操作与位姿重校准三个模块（原文Fig. 3）。",
              "en": "Software architecture: patrol, inspection, and pose-recalibration modules (original Fig. 3)."
            },
            "displayWidth": 800,
            "layout": "full"
          },
          {
            "src": "assets/projects/patrol-inspection/paper/coordinate-frames.webp",
            "caption": {
              "zh": "地图、里程计、底盘、机械臂与相机之间的TF坐标关系（原文Fig. 4）。",
              "en": "TF relationships among map, odometry, base, arm, and cameras (original Fig. 4)."
            },
            "displayWidth": 700,
            "layout": "full"
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "实机视频展示移动巡检操作平台的设备接近与交互。论文中的识别可视化展示不同颜色按钮的检测结果；巡检路线图和融合对照图分别说明三个检查点的循环访问，以及深度观测对货架等障碍的补充感知。",
            "en": "The real-robot video shows equipment approach and interaction. The paper’s detection examples show different button colors; its route and fusion examples illustrate cyclic visits to three checkpoints and depth-based detection of obstacles such as shelving."
          }
        ],
        "figures": [
          {
            "video": "assets/projects/patrol-inspection/demo.mp4",
            "poster": "assets/projects/patrol-inspection/poster.webp",
            "caption": {
              "zh": "移动巡检操作平台：设备接近与机械臂交互实机测试。",
              "en": "Mobile inspection platform: real-robot approach and arm interaction."
            },
            "layout": "full"
          },
          {
            "src": "assets/projects/patrol-inspection/paper/button-recognition.webp",
            "caption": {
              "zh": "红、黄、绿按钮的视觉识别结果（原文Fig. 9）。",
              "en": "Visual recognition of red, yellow, and green buttons (original Fig. 9)."
            },
            "displayWidth": 640,
            "layout": "full"
          },
          {
            "src": "assets/projects/patrol-inspection/paper/patrol-route.webp",
            "caption": {
              "zh": "二维地图中的起点、三个检查点与循环巡检路线（原文Fig. 10）。",
              "en": "Start point, three checkpoints, and the cyclic patrol route (original Fig. 10)."
            },
            "row": "navigation-validation",
            "rowWidth": 1000
          },
          {
            "src": "assets/projects/patrol-inspection/paper/sensor-fusion-obstacles.webp",
            "caption": {
              "zh": "融合关闭/开启的障碍观测对比：补充单平面激光未检出的货架结构（原文Fig. 11）。",
              "en": "Fusion off/on: depth adds shelving structures missed by single-plane LiDAR (original Fig. 11)."
            },
            "row": "navigation-validation",
            "rowWidth": 1000
          }
        ]
      },
      {
        "id": "experiments",
        "title": {
          "zh": "实验与验证",
          "en": "Experiments and validation"
        },
        "paragraphs": [
          {
            "zh": "按钮检测数据集包含352张原始图像，经噪声、亮度、裁剪与旋转等增强得到5120张，按7∶2∶1划分训练、验证和测试集。YOLOv5n采用640×640输入，训练100轮；实机检测在N100计算单元上运行。",
            "en": "The button dataset contains 352 original images, augmented to 5,120 using noise, brightness changes, cropping, and rotation, then split 7:2:1 for training, validation, and testing. YOLOv5n uses 640×640 inputs and 100 training epochs; robot-side detection runs on the N100 computer."
          },
          {
            "zh": "按钮按压试验对绿、红、黄三类按钮各测试50次，成功次数分别为43、45、42，共130/150次，平均成功率86.67%。成功要求按钮被充分按下并能复位；该数值对应完整按压操作。",
            "en": "Pressing trials test green, red, and yellow buttons 50 times each, with 43, 45, and 42 successes: 130/150 overall, or 86.67%. A successful trial requires adequate depression and return to the original button state; this measures the complete pressing operation."
          },
          {
            "zh": "连续巡检对照实验分别在开启和关闭位姿重校准时运行6轮，共12轮。论文原表报告平均位置误差由0.1601米降至0.1211米，改善24.35%；平均朝向误差由4.3658°降至3.2002°，改善26.70%。各检查点改善幅度不同，位置结果中也存在未改善的检查点。",
            "en": "Patrol comparison runs six consecutive rounds with recalibration enabled and six with it disabled, totaling twelve. The original tables report mean position error decreasing from 0.1601 m to 0.1211 m (24.35%) and mean orientation error from 4.3658° to 3.2002° (26.70%). Improvements vary across checkpoints, including one without improved position error."
          },
          {
            "zh": "验证环境为平整地面的实物模拟机房，检查按钮的地图位姿预先配置。长距离移动和大角度转弯会影响定位，系统通过检查点接触继续重校准；这些实验结果限定在论文描述的配置与场景中。",
            "en": "Validation uses a physical simulated machine room on flat terrain, with button map poses configured in advance. Long moves and large rotations affect localization, motivating repeated checkpoint contact updates. These results apply to the settings and hardware described in the paper."
          }
        ],
        "figures": [
          {
            "src": "assets/projects/patrol-inspection/paper/button-trials-table.webp",
            "caption": {
              "zh": "三类按钮各50次按压的原始结果（原文Table 1）。",
              "en": "Original results for 50 pressing trials per button category (Table 1)."
            },
            "kind": "table",
            "displayWidth": 680,
            "layout": "full"
          },
          {
            "src": "assets/projects/patrol-inspection/paper/position-errors-table.webp",
            "caption": {
              "zh": "开启/关闭接触校准的位置误差对照（原文Table 2）。",
              "en": "Position errors with contact recalibration enabled/disabled (original Table 2)."
            },
            "kind": "table",
            "row": "pose-error-tables",
            "rowWidth": 1080
          },
          {
            "src": "assets/projects/patrol-inspection/paper/orientation-errors-table.webp",
            "caption": {
              "zh": "开启/关闭接触校准的朝向误差对照（原文Table 3）。",
              "en": "Orientation errors with contact recalibration enabled/disabled (original Table 3)."
            },
            "kind": "table",
            "row": "pose-error-tables",
            "rowWidth": 1080
          }
        ],
        "source": {
          "label": {
            "zh": "图表来源：Zhesheng Zhang 与 Long Chen，IEEE Access（2025），DOI: 10.1109/ACCESS.2025.3553521",
            "en": "Figures and tables: Zhesheng Zhang and Long Chen, IEEE Access (2025), DOI: 10.1109/ACCESS.2025.3553521"
          },
          "url": "https://doi.org/10.1109/ACCESS.2025.3553521"
        }
      }
    ],
    "categoryKey": "manipulation",
    "category": {
      "zh": "移动巡检操作",
      "en": "Mobile inspection & interaction"
    },
    "year": "2023–2024",
    "media": {
      "video": "assets/projects/patrol-inspection/demo.mp4",
      "poster": "assets/projects/patrol-inspection/poster.webp",
      "alt": {
        "zh": "厂房巡检机器人实机演示",
        "en": "Plant inspection robot demo"
      }
    },
    "period": {
      "zh": "2023.10—2024.10",
      "en": "Oct 2023–Oct 2024"
    },
    "group": "primary"
  },
  {
    "id": "aloha",
    "title": {
      "zh": "双臂示教学习与移动操作",
      "en": "Dual-arm imitation learning and mobile manipulation"
    },
    "summary": {
      "zh": "面向双臂操作技能学习，以主从机械臂采集示教并训练 ACT；仿真与实机演示木块递交、羽毛球抓取和嵌套物体拆解。",
      "en": "For bimanual skill learning, leader–follower arms collect demonstrations for ACT; simulation and real robots demonstrate block handoff, shuttlecock grasping, and nested-object separation."
    },
    "facts": [
      {
        "label": {
          "zh": "研发阶段",
          "en": "Development period"
        },
        "value": {
          "zh": "2023.11—2024.05",
          "en": "Nov 2023–May 2024"
        }
      },
      {
        "label": {
          "zh": "学习方法",
          "en": "Learning method"
        },
        "value": {
          "zh": "人工示教与 ACT",
          "en": "Human demonstrations and ACT"
        }
      },
      {
        "label": {
          "zh": "任务类型",
          "en": "Tasks"
        },
        "value": {
          "zh": "单臂、双臂与移动操作探索",
          "en": "Single-arm, dual-arm, and mobile manipulation"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "单次抓取难以覆盖嵌套、勾连和需要双手配合的操作。项目通过人工示教学习动作序列，研究双臂协作在不同物体摆放下的执行方式。",
            "en": "A single grasp cannot cover nesting, entanglement, and coordinated two-handed tasks. Human demonstrations provide action sequences for dual-arm manipulation under different object arrangements."
          },
          {
            "zh": "嵌套羽毛球等任务不仅需要选定抓取位置，还需要按顺序固定、分离和递交物体。主从示教记录人如何协调双臂，为学习长动作序列和两臂之间的配合关系提供数据。",
            "en": "Nested shuttlecocks require more than choosing a grasp: objects must be held, separated, and handed over in sequence. Leader–follower demonstrations record this coordination to support learning multi-step actions and relationships between the two arms."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "从仿真木块递交开始，扩展到实机单臂抓取、双臂羽毛球拿取和嵌套分离。移动操作平台还考虑装球、球桶安装及简单服务取物等任务场景。",
            "en": "Tasks progress from simulated block handover to physical single-arm grasping, dual-arm shuttlecock pickup, and nested-object separation. The mobile platform also considers loading shuttlecocks, installing a tube, and simple service-object handling."
          },
          {
            "zh": "通过主机械臂采集动作、从机械臂执行及相机记录观测，将视觉图像与关节状态、动作序列对齐。验证从单物体抓取扩展到双臂交接与分离时，示教策略能否在对应任务布置中重现动作。",
            "en": "Leader-arm actions, follower execution, camera observations, and joint states are aligned into demonstration sequences. Tests examine whether learned actions can be reproduced when progressing from single-object pickup to two-arm handover and separation."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/aloha/ppt/summary-image107.webp",
            "caption": {
              "zh": "嵌套羽毛球操作场景",
              "en": "Nested shuttlecock task"
            }
          },
          {
            "src": "assets/projects/aloha/ppt/summary-image108.webp",
            "caption": {
              "zh": "多羽毛球抓取场景",
              "en": "Multiple-shuttlecock task"
            }
          },
          {
            "src": "assets/projects/aloha/ppt/summary-image109.webp",
            "caption": {
              "zh": "单羽毛球抓取场景",
              "en": "Single-shuttlecock task"
            }
          },
          {
            "src": "assets/projects/aloha/ppt/summary-image110.webp",
            "caption": {
              "zh": "相互勾连的羽毛球",
              "en": "Entangled shuttlecocks"
            }
          }
        ]
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "双臂移动捡球平台采用智猿底盘、Widow 主机械臂、Viper 从机械臂和 RGB-D 相机。主从结构用于示教数据采集，视觉和关节状态为动作学习提供输入。",
            "en": "The mobile platform uses a ZhiYuan base, Widow leader arms, Viper follower arms, and RGB-D sensing. The leader–follower arrangement records demonstrations, while vision and joint state support policy learning."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/aloha/ppt/summary-image106.webp",
            "caption": {
              "zh": "双臂移动操作平台实机",
              "en": "Dual-arm mobile manipulation platform"
            },
            "role": "main"
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "围绕示教数据、动作片段建模和机器人执行组织模仿学习流程，区分仿真验证与实机操作。",
            "en": "The imitation-learning pipeline connects demonstrations, action-chunk modeling, and robot execution, with simulation and physical tests presented separately."
          }
        ],
        "points": [],
        "figures": [],
        "techniques": [
          {
            "name": {
              "zh": "主从遥操作与同步数据采集",
              "en": "Leader–follower teleoperation and synchronized data"
            },
            "description": {
              "zh": "同步记录相机图像、关节状态与人工示教动作，建立观测和动作序列的时间对应，为单臂抓取与双臂交接提供训练样本。",
              "en": "Record camera images, joint states, and demonstrated actions with temporal alignment, providing examples for single-arm grasping and bimanual handoff."
            }
          },
          {
            "name": {
              "zh": "ACT 动作片段模仿学习",
              "en": "ACT action-chunk imitation learning"
            },
            "description": {
              "zh": "用连续动作片段表示操作技能，训练模型从视觉与关节观测预测后续动作序列，并将输出接入机械臂执行流程。",
              "en": "Represent manipulation through action chunks, train predictions of subsequent actions from visual and joint observations, and connect the sequences to arm execution."
            }
          },
          {
            "name": {
              "zh": "Mask 观测与航点式模仿学习探索",
              "en": "Mask observations and waypoint-based learning"
            },
            "description": {
              "zh": "分别测试目标区域 mask 与航点组织方式，比较不同观测和动作表示对羽毛球拿取、交接及嵌套分离过程的影响。",
              "en": "Explore target-region masks and waypoint representations, examining their effects on shuttlecock pickup, handoff, and nested-object separation."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "补充木块递交仿真、单臂取物、双臂配合及单球、多球、嵌套羽毛球操作片段。视频覆盖不同任务设置，其中多球抓取存在失败案例。",
            "en": "Demonstrations cover simulated block handover, single-arm pickup, coordinated two-arm actions, and single, multiple, and nested shuttlecock handling. The slides also document failures in multi-object grasping."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/aloha/ppt-29.mp4",
            "poster": "assets/projects/aloha/ppt-29.poster.webp",
            "caption": {
              "zh": "双臂递木块仿真示例",
              "en": "Simulated dual-arm block handover"
            },
            "layout": "full"
          },
          {
            "video": "assets/projects/aloha/ppt-30.mp4",
            "poster": "assets/projects/aloha/ppt-30.poster.webp",
            "caption": {
              "zh": "单臂木块抓取实机测试（一）",
              "en": "Real-robot single-arm block grasp I"
            }
          },
          {
            "video": "assets/projects/aloha/ppt-37.mp4",
            "poster": "assets/projects/aloha/ppt-37.poster.webp",
            "caption": {
              "zh": "单臂木块抓取实机测试（二）",
              "en": "Real-robot single-arm block grasp II"
            }
          },
          {
            "video": "assets/projects/aloha/ppt-32.mp4",
            "poster": "assets/projects/aloha/ppt-32.poster.webp",
            "caption": {
              "zh": "羽毛球单球抓取测试（一）",
              "en": "Single-shuttlecock grasp test I"
            }
          },
          {
            "video": "assets/projects/aloha/ppt-33.mp4",
            "poster": "assets/projects/aloha/ppt-33.poster.webp",
            "caption": {
              "zh": "羽毛球单球抓取测试（二）",
              "en": "Single-shuttlecock grasp test II"
            }
          },
          {
            "video": "assets/projects/aloha/ppt-31.mp4",
            "poster": "assets/projects/aloha/ppt-31.poster.webp",
            "caption": {
              "zh": "双臂嵌套羽毛球操作",
              "en": "Dual-arm nested-shuttlecock manipulation"
            }
          },
          {
            "video": "assets/projects/aloha/ppt-34.mp4",
            "poster": "assets/projects/aloha/ppt-34.poster.webp",
            "caption": {
              "zh": "双臂多羽毛球操作",
              "en": "Dual-arm multiple-shuttlecock manipulation"
            }
          },
          {
            "video": "assets/projects/aloha/demo.mp4",
            "poster": "assets/projects/aloha/poster.webp",
            "caption": {
              "zh": "双臂羽毛球协作操作",
              "en": "Coordinated dual-arm shuttlecock manipulation"
            }
          },
          {
            "video": "assets/projects/aloha/ppt-35.mp4",
            "poster": "assets/projects/aloha/ppt-35.poster.webp",
            "caption": {
              "zh": "不同桌面物体抓取测试",
              "en": "Grasp tests with different tabletop objects"
            }
          }
        ]
      },
      {
        "id": "experiments",
        "title": {
          "zh": "实验记录",
          "en": "Experimental observations"
        },
        "paragraphs": [
          {
            "zh": "当前仿真记录中，有航点与无航点两种设置的成功率分别为90%和98%。下图展示对应的仿真日志与轨迹，供分析动作分段和轨迹形态。",
            "en": "The current simulation records show success rates of 90% with waypoints and 98% without waypoints. The logs and trajectories below illustrate action segmentation and trajectory shape."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/aloha/ppt/summary-image97.webp",
            "caption": {
              "zh": "两种设置的仿真日志",
              "en": "Simulation logs for the two settings"
            }
          },
          {
            "src": "assets/projects/aloha/ppt/summary-image98.webp",
            "caption": {
              "zh": "双臂轨迹记录示意",
              "en": "Recorded dual-arm trajectories"
            }
          }
        ]
      }
    ],
    "categoryKey": "manipulation",
    "category": {
      "zh": "双臂示教学习",
      "en": "Dual-arm imitation learning"
    },
    "media": {
      "video": "assets/projects/aloha/ppt-32.mp4",
      "poster": "assets/projects/aloha/ppt-32.poster.webp",
      "alt": {
        "zh": "双臂机械臂操作演示",
        "en": "Dual-arm manipulation demonstration"
      }
    },
    "period": {
      "zh": "2023.11—2024.05",
      "en": "Nov 2023–May 2024"
    },
    "group": "primary"
  },
  {
    "id": "shuttlecock-grasping",
    "title": {
      "zh": "捡球机器人",
      "en": "Shuttlecock collection robot"
    },
    "summary": {
      "zh": "面向单球与堆叠羽毛球拾取，以 YOLOv5 关键点估计抓握姿态并抖动分离；实机单球/多球准确率97.83%/95.1%。",
      "en": "For single and stacked shuttlecock pickup, YOLOv5 keypoints guide grasp poses and shaking separates targets; real grasp accuracy is 97.83% for single and 95.1% for multiple shuttlecocks."
    },
    "facts": [
      {
        "label": {
          "zh": "任务",
          "en": "Task"
        },
        "value": {
          "zh": "羽毛球识别、夹取与分离",
          "en": "Shuttlecock recognition, pickup, and separation"
        }
      },
      {
        "label": {
          "zh": "感知方法",
          "en": "Perception"
        },
        "value": {
          "zh": "YOLOv5关键部位检测与几何姿态估计",
          "en": "YOLOv5 key-region detection and geometric pose estimation"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "羽毛球的球头、羽身和方向差异会改变可夹持位置；多球堆叠或勾连时，直接闭合夹爪容易同时带起多个目标。项目围绕球体姿态判断与抓取后的目标分离，完成自动捡球的视觉与机械臂流程。",
            "en": "A shuttlecock’s head, feather body, and orientation affect its graspable region. Piled or entangled targets can be lifted together by a simple gripper closure. The project connects pose-aware perception with post-grasp separation for automatic collection."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Tasks"
        },
        "paragraphs": [
          {
            "zh": "识别单球或多球场景中的球头与球身关键部位，估计目标方向和夹持姿态，控制机械臂接近并夹取目标。对堆叠与勾连情况，在抓取后执行摆动、抖动等分离动作，取出目标羽毛球。",
            "en": "Detect head and body key regions in single- and multiple-shuttlecock scenes, estimate target orientation and grasp pose, and execute the approach and pickup. Swinging and shaking after closure separate the target from piled or entangled neighbors."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/shuttlecock-grasping/ppt/summary-image25.webp",
            "caption": {
              "zh": "视觉捡球中的嵌套、竖向与勾连场景",
              "en": "Nested, upright, and entangled configurations in the collection system"
            }
          },
          {
            "src": "assets/projects/shuttlecock-grasping/ppt/summary-image24.webp",
            "caption": {
              "zh": "视觉捡球中的夹持方向选择",
              "en": "Grasp-orientation choice in the collection system"
            }
          }
        ]
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "实机由机械臂、夹爪、相机与控制计算单元组成，基于 ROS 连接图像识别、抓握姿态计算和机械臂动作执行。",
            "en": "The prototype combines a robot arm, gripper, camera, and control computer. ROS connects image recognition, grasp-pose estimation, and arm execution."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/shuttlecock-grasping/ppt/summary-image27.webp",
            "caption": {
              "zh": "视觉捡球样机及识别界面",
              "en": "Prototype and perception interface for the collection system"
            },
            "role": "main"
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "系统把关键部位检测、几何姿态计算与分步机械臂控制连接起来，解决羽毛球姿态变化和堆叠勾连。",
            "en": "The system combines key-part detection, geometric pose computation, and staged arm control to address pose variation and entangled shuttlecocks."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/shuttlecock-grasping/ppt/summary-image118.webp",
            "caption": {
              "zh": "视觉捡球的识别与抓取流程",
              "en": "Perception and grasp-control pipeline for collection"
            },
            "displayWidth": 700
          }
        ],
        "techniques": [
          {
            "name": {
              "zh": "YOLOv5 关键部位检测",
              "en": "YOLOv5 key-part detection"
            },
            "description": {
              "zh": "检测球头与球身关键点，获得比普通目标框更适合抓取姿态估计的结构信息。",
              "en": "Detect shuttlecock heads and body keypoints, providing structural information for grasp-pose estimation beyond a bounding box."
            }
          },
          {
            "name": {
              "zh": "几何方向与抓握位姿求解",
              "en": "Geometric direction and grasp-pose estimation"
            },
            "description": {
              "zh": "利用关键点相对位置求解方向矢量，选择骨架主干上的抓握点和夹爪方向，将视觉检测结果转成操作位姿。",
              "en": "Estimate the direction vector from keypoint geometry and select a grasp point and gripper orientation along the body, converting visual detections into manipulation poses."
            }
          },
          {
            "name": {
              "zh": "ROS 分步控制与抖动分离",
              "en": "ROS staged control and shaking-based separation"
            },
            "description": {
              "zh": "按接近、夹紧、抬升和抖动分离组织动作，在夹取后加入摆动以处理多球堆叠和勾连。",
              "en": "Sequence approach, closure, lifting, and shaking in ROS, adding post-grasp motion to separate stacked or entangled shuttlecocks."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "实机片段展示捡球样机与羽毛球抓取过程，以下识别图和实验结果对应同一类视觉捡球任务。",
            "en": "The robot clip demonstrates the collection prototype and shuttlecock grasping. The perception images and reported experiments concern the same visual pickup task."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/shuttlecock-grasping/demo.mp4",
            "poster": "assets/projects/shuttlecock-grasping/poster.webp",
            "caption": {
              "zh": "羽毛球视觉捡球演示",
              "en": "Visual shuttlecock collection system demonstration"
            }
          }
        ]
      },
      {
        "id": "experiments",
        "title": {
          "zh": "实验结果",
          "en": "Experimental results"
        },
        "paragraphs": [
          {
            "zh": "实机单羽毛球抓取准确率为97.83%，多羽毛球抓取准确率为95.1%。姿态检测和夹持后抖动分别对应目标选择与堆叠分离环节。",
            "en": "Physical tests report 97.83% accuracy for single-shuttlecock grasping and 95.1% for multiple shuttlecocks. Pose detection supports target selection, while post-grasp shaking handles separation."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/shuttlecock-grasping/ppt/summary-image26.webp",
            "caption": {
              "zh": "视觉捡球的关键部位检测结果",
              "en": "Key-region detection for the collection system"
            }
          }
        ]
      }
    ],
    "categoryKey": "manipulation",
    "category": {
      "zh": "视觉抓取",
      "en": "Visual grasping"
    },
    "media": {
      "video": "assets/projects/shuttlecock-grasping/demo.mp4",
      "poster": "assets/projects/shuttlecock-grasping/poster.webp",
      "alt": {
        "zh": "捡球机器人实机识别与抓取演示",
        "en": "Shuttlecock collection robot: recognition and grasping"
      }
    },
    "group": "primary"
  },
  {
    "id": "lidar-3d",
    "title": {
      "zh": "三维激光雷达与惯性融合导航",
      "en": "3D LiDAR–inertial mapping and navigation"
    },
    "summary": {
      "zh": "面向三维建图与避障，以 LIO-SAM 融合激光雷达与 IMU，衔接规划和控制；实机验证走廊及障碍环境的自主导航。",
      "en": "For 3D mapping and obstacle avoidance, LIO-SAM fuses LiDAR and IMU measurements; planning and base control enable real navigation in corridors and obstacle-filled rooms."
    },
    "facts": [
      {
        "label": {
          "zh": "研发阶段",
          "en": "Development period"
        },
        "value": {
          "zh": "2022.09—2023.01",
          "en": "Sep 2022–Jan 2023"
        }
      },
      {
        "label": {
          "zh": "主要传感器",
          "en": "Sensors"
        },
        "value": {
          "zh": "三维激光雷达与 IMU",
          "en": "3D LiDAR and IMU"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "复杂室内环境存在不同高度障碍和连续转弯，需要利用三维几何和惯性信息估计机器人运动，并支持目标点导航。",
            "en": "Indoor environments contain obstacles at different heights and repeated turns, motivating joint use of 3D geometry and inertial motion for localization and navigation."
          },
          {
            "zh": "仅依靠平面扫描难以描述悬空、低矮或形状复杂的障碍，连续运动还会改变点云采样时刻对应的姿态。三维激光与惯性融合既提供空间结构，也为运动过程中的位姿连续性提供约束。",
            "en": "Planar scans cannot fully describe overhanging, low, or irregular obstacles, while motion changes the pose associated with each point-cloud sample. LiDAR–inertial fusion supplies both spatial structure and constraints on pose continuity."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "采集环境点云并建立地图，持续估计机器人位姿，接收目标位置后生成路径和避障轨迹，驱动底盘到达目标。",
            "en": "Build a point-cloud map, estimate the robot pose continuously, and plan obstacle-aware motion to a specified goal."
          },
          {
            "zh": "工作流程由地图建立、位姿估计、目标下发、全局路径与局部轨迹生成组成。演示同时观察机器人实际通行和地图中的位置、路径变化，从而检查感知定位与底盘执行是否对应。",
            "en": "The workflow includes map creation, pose estimation, goal specification, and global and local planning. Physical traversal and map-side pose and path updates are observed together to check consistency between estimation and base execution."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "平台为四轮无人车，搭载三维激光雷达、IMU 和计算控制单元。右侧为独立展示的三维激光雷达传感器。",
            "en": "A four-wheel robot carries 3D LiDAR, an IMU, and computing/control hardware. The LiDAR sensor is shown separately to the right."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/lidar-3d/ppt/summary-image88.webp",
            "caption": {
              "zh": "激光导航无人车平台",
              "en": "LiDAR-navigation mobile platform"
            },
            "role": "main",
            "rowWidth": 600
          },
          {
            "src": "assets/projects/lidar-3d/ppt/summary-image85.webp",
            "caption": {
              "zh": "三维激光雷达传感器",
              "en": "3D LiDAR sensor"
            },
            "role": "sensor",
            "rowWidth": 600
          }
        ],
        "layout": "equipment"
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "定位建图层估计机器人位姿与环境结构，导航层将地图和目标位置转换为路径与底盘控制。",
            "en": "Mapping estimates robot pose and environmental geometry; navigation converts the map and target into paths and base commands."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/lidar-3d/ppt/summary-image84.webp",
            "caption": {
              "zh": " LIO-SAM 模块框架",
              "en": "LIO-SAM modules shown in the slides"
            }
          }
        ],
        "techniques": [
          {
            "name": {
              "zh": "LIO-SAM 激光惯性里程计",
              "en": "LIO-SAM LiDAR–inertial odometry"
            },
            "description": {
              "zh": "融合三维激光点云与 IMU，利用惯性运动先验和激光几何约束持续估计机器人位姿。",
              "en": "Fuse 3D LiDAR and IMU measurements, combining inertial motion priors with geometric constraints for continuous pose estimation."
            }
          },
          {
            "name": {
              "zh": "惯性预积分与因子图优化",
              "en": "Inertial preintegration and factor-graph optimization"
            },
            "description": {
              "zh": "通过惯性预积分、激光配准及因子图整合相邻时刻和地图约束，输出供导航使用的连续位姿与点云地图。",
              "en": "Combine inertial preintegration, LiDAR registration, and factor-graph constraints to supply navigation with pose estimates and a point-cloud map."
            }
          },
          {
            "name": {
              "zh": "目标点规划与局部避障",
              "en": "Goal planning and local obstacle avoidance"
            },
            "description": {
              "zh": "基于地图生成到目标的全局路径，结合实时障碍信息更新局部轨迹，并把轨迹转换为底盘指令；地图与轨迹可视化用于联调。",
              "en": "Plan a global path on the map, update local motion from obstacle observations, and convert trajectories into base commands, using map and path visualization for integration checks."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "主视频同步展示导航地图、局部轨迹与机器人运动；其余片段展示室内目标点通行、不同障碍布局下的避障和人员穿行场景。点云地图展示实测环境的三维结构。",
            "en": "The main video shows the navigation map, local trajectories, and robot motion. Additional clips cover indoor goal reaching, obstacle avoidance across layouts, and a person crossing the scene. A recorded point-cloud map shows the environment’s 3D structure."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/lidar-3d/ppt-26.mp4",
            "poster": "assets/projects/lidar-3d/ppt-26.poster.webp",
            "caption": {
              "zh": "三维激光导航：地图与局部轨迹可视化",
              "en": "3D LiDAR navigation: map and local trajectories"
            },
            "layout": "full"
          },
          {
            "video": "assets/projects/lidar-3d/ppt-25.mp4",
            "poster": "assets/projects/lidar-3d/ppt-25.poster.webp",
            "caption": {
              "zh": "三维激光导航：室内目标点通行",
              "en": "3D LiDAR navigation: indoor goal reaching"
            }
          },
          {
            "video": "assets/projects/lidar-3d/ppt-27.mp4",
            "poster": "assets/projects/lidar-3d/ppt-27.poster.webp",
            "caption": {
              "zh": "三维激光导航：不同障碍布局通行",
              "en": "3D LiDAR navigation: movement across obstacle layouts"
            }
          },
          {
            "video": "assets/projects/lidar-3d/demo.mp4",
            "poster": "assets/projects/lidar-3d/poster.webp",
            "caption": {
              "zh": "三维激光导航：人员穿行场景",
              "en": "3D LiDAR navigation: a person crossing the scene"
            }
          },
          {
            "src": "assets/projects/lidar-3d/ppt/summary-image89.webp",
            "caption": {
              "zh": "实测点云地图",
              "en": "Recorded point-cloud map"
            }
          }
        ]
      }
    ],
    "categoryKey": "navigation",
    "category": {
      "zh": "激光导航",
      "en": "LiDAR navigation"
    },
    "media": {
      "video": "assets/projects/lidar-3d/ppt-26.mp4",
      "poster": "assets/projects/lidar-3d/ppt-26.poster.webp",
      "alt": {
        "zh": "三维激光导航：地图与局部轨迹可视化",
        "en": "3D LiDAR navigation: map and local trajectories"
      }
    },
    "period": {
      "zh": "2022.09—2023.01",
      "en": "Sep 2022–Jan 2023"
    },
    "group": "primary"
  },
  {
    "id": "rtk-navigation",
    "title": {
      "zh": "RTK 校园道路自主循迹",
      "en": "RTK-guided campus route following"
    },
    "summary": {
      "zh": "面向校园道路自主循迹，自建 RTK 基站并融合 GNSS、九轴 IMU，经 EKF 平滑与 MPC 控制，实现校园道路上的实机循迹和转弯。",
      "en": "For autonomous campus-road tracking, a local RTK base, GNSS, and a nine-axis IMU feed EKF smoothing and MPC; real-robot tests demonstrate route following and turns on campus roads."
    },
    "facts": [
      {
        "label": {
          "zh": "研发阶段",
          "en": "Development period"
        },
        "value": {
          "zh": "2022.03—2022.04",
          "en": "Mar–Apr 2022"
        }
      },
      {
        "label": {
          "zh": "演示地点",
          "en": "Setting"
        },
        "value": {
          "zh": "山东大学校园道路",
          "en": "Shandong University campus roads"
        }
      },
      {
        "label": {
          "zh": "传感器",
          "en": "Sensors"
        },
        "value": {
          "zh": "RTK GNSS、九轴 IMU",
          "en": "RTK GNSS and nine-axis IMU"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "普通 GNSS 易受大气、遮挡和多路径影响，位置跳变会干扰底盘循迹。项目搭建差分定位链路，将室外定位和运动控制连接为校园道路导航系统。",
            "en": "GNSS errors, occlusion, and multipath can disturb path tracking. Differential positioning links outdoor localization with base control for campus navigation."
          },
          {
            "zh": "校园路线包含较长直道、转弯与坡道，既需要稳定的绝对位置，也需要平滑的短时姿态估计。定位和控制之间的接口需要处理坐标一致性、测量波动和底盘运动响应。",
            "en": "Campus routes combine long straights, turns, and ramps, requiring stable absolute position and smooth short-term orientation. The localization-to-control interface must handle coordinate consistency, measurement variation, and base response."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "以山东大学东门停车场至计算机科学与技术学院的路线为目标，建立参考站与车载流动站，记录或设置参考轨迹，控制无人车沿道路行驶。",
            "en": "The target route connects the east-gate parking area and the School of Computer Science and Technology. A base station and robot-mounted rover support route recording and autonomous tracking."
          },
          {
            "zh": "将参考轨迹与实时融合位姿放在同一坐标系中，持续计算车辆相对路线的偏离并生成控制指令。通过道路跟拍、路侧视角和参考/实际轨迹对照，观察直行、转弯及坡道阶段的循迹行为。",
            "en": "Reference paths and fused poses share a coordinate system so route deviation can be converted into continuous control commands. Following and roadside views, together with reference-versus-measured trajectories, document straight, turning, and ramp behavior."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/rtk-navigation/ppt/summary-image74.webp",
            "caption": {
              "zh": "校园道路与目标路线示意",
              "en": "Campus route and destination plan"
            }
          }
        ]
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "四轮无人车搭载 GNSS 接收器、九轴 IMU、中央控制器、微控制器和轮毂电机；固定参考站向流动站提供差分信息。",
            "en": "A four-wheel vehicle carries GNSS, a nine-axis IMU, a central controller, microcontrollers, and hub motors. A fixed base provides differential corrections to the rover."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/rtk-navigation/ppt/summary-image75.webp",
            "caption": {
              "zh": "四轮无人车平台",
              "en": "Four-wheel mobile platform"
            },
            "role": "main",
            "rowWidth": 560
          },
          {
            "src": "assets/projects/rtk-navigation/ppt/summary-image76.webp",
            "caption": {
              "zh": "GNSS 与计算单元",
              "en": "GNSS and computer"
            },
            "role": "sensor",
            "rowWidth": 560
          }
        ],
        "layout": "equipment",
        "equipmentRatio": 1.5
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "系统按差分定位、融合估计与循迹控制分层，将定位观测持续转化为车辆控制量。",
            "en": "The system separates differential positioning, state estimation, and tracking control, continually turning sensor observations into vehicle commands."
          }
        ],
        "points": [],
        "figures": [],
        "techniques": [
          {
            "name": {
              "zh": "自建 RTK 基站与流动站",
              "en": "Local RTK base and rover"
            },
            "description": {
              "zh": "参考站与车载接收机同步观测卫星信号，通过差分信息求解车辆位置，形成校园范围内的绝对定位链路。",
              "en": "Synchronize satellite observations at a fixed reference station and vehicle receiver, using differential corrections to obtain absolute positions on campus."
            }
          },
          {
            "name": {
              "zh": "GNSS–IMU 扩展卡尔曼滤波（EKF）",
              "en": "GNSS–IMU extended Kalman filtering"
            },
            "description": {
              "zh": "以 GNSS 绝对位置约束惯性漂移，以九轴 IMU 补充姿态变化，通过预测与观测更新平滑位姿，减轻位置跳变对控制的影响。",
              "en": "Constrain inertial drift with GNSS position and use the nine-axis IMU for orientation changes; prediction and measurement updates smooth the pose supplied to control."
            }
          },
          {
            "name": {
              "zh": "MPC 轨迹跟踪",
              "en": "MPC trajectory tracking"
            },
            "description": {
              "zh": "把融合位姿与参考轨迹放在同一坐标系中，滚动预测后续运动并优化控制量，在直行与转弯过程中修正横向和朝向偏差。",
              "en": "Express the estimated pose and reference path in a shared frame, predict future motion over a receding horizon, and optimize controls to correct lateral and heading errors."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "补充道路车载视角、路侧拍摄与校园坡道等演示，并展示参考轨迹和实际轨迹对比。定位受到遮挡与多路径影响，RTK 定位本身不提供周围障碍感知。",
            "en": "Demonstrations include onboard and roadside views, campus routes, and ramps, together with reference-versus-actual trajectories. Positioning remains sensitive to occlusion and multipath; RTK alone does not sense obstacles."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/rtk-navigation/ppt-22.mp4",
            "poster": "assets/projects/rtk-navigation/ppt-22.poster.webp",
            "caption": {
              "zh": "校园道路循迹：车载跟拍视角",
              "en": "Campus route following: close tracking view"
            },
            "row": "rtk-onboard"
          },
          {
            "video": "assets/projects/rtk-navigation/ppt-24.mp4",
            "poster": "assets/projects/rtk-navigation/ppt-24.poster.webp",
            "caption": {
              "zh": "校园道路与坡道循迹",
              "en": "Campus road and ramp tracking"
            },
            "row": "rtk-onboard"
          },
          {
            "video": "assets/projects/rtk-navigation/demo.mp4",
            "poster": "assets/projects/rtk-navigation/poster.webp",
            "caption": {
              "zh": "校园道路循迹：路侧视角",
              "en": "Campus route following: roadside view"
            }
          },
          {
            "src": "assets/projects/rtk-navigation/ppt/summary-image80.webp",
            "caption": {
              "zh": "参考轨迹与实际轨迹对比",
              "en": "Reference and measured trajectories"
            },
            "layout": "full",
            "displayWidth": 520
          }
        ]
      }
    ],
    "categoryKey": "navigation",
    "category": {
      "zh": "室外导航",
      "en": "Outdoor navigation"
    },
    "media": {
      "video": "assets/projects/rtk-navigation/demo.mp4",
      "poster": "assets/projects/rtk-navigation/poster.webp",
      "alt": {
        "zh": "四轮机器人校园道路循迹视频",
        "en": "Four-wheel robot following a campus road"
      }
    },
    "period": {
      "zh": "2022.03—2022.04",
      "en": "Mar–Apr 2022"
    },
    "group": "primary"
  },
  {
    "id": "agva",
    "title": {
      "zh": "基于半人型机器人的激光雷达与视觉融合导航操作系统",
      "en": "LiDAR–vision navigation and manipulation with a semi-humanoid robot"
    },
    "summary": {
      "zh": "面向半人型机器人的定位与作业位置到达，融合激光雷达、视觉点云和 SLAM；实机展示走廊导航、绕障与接近工作台。",
      "en": "For a semi-humanoid robot, LiDAR, visual point clouds, and SLAM support localization and task-site arrival; real demonstrations cover corridor navigation, obstacles, and workbench approach."
    },
    "facts": [
      {
        "label": {
          "zh": "项目时间",
          "en": "Period"
        },
        "value": {
          "zh": "2022.05—2023.03",
          "en": "May 2022–Mar 2023"
        }
      },
      {
        "label": {
          "zh": "本人职责",
          "en": "Role"
        },
        "value": {
          "zh": "主要研发成员",
          "en": "Research and development contributor"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "二维激光雷达只观测一个高度平面，难以覆盖室内不同高度的障碍。项目引入相机信息，并把融合感知与移动操作平台的导航需求连接起来。",
            "en": "A 2D LiDAR observes a single plane and can miss obstacles at other heights. Camera information extends perception for a mobile manipulation platform."
          },
          {
            "zh": "移动操作平台的机身与机械臂占据不同高度空间，底盘所在平面安全不代表整机通行安全。融合视觉几何与激光扫描，可为室内地图和障碍代价提供更完整的环境信息。",
            "en": "The base, body, and arm occupy different heights, so a clear base-level plane does not guarantee clearance for the whole robot. Fusing visual geometry with laser scans provides richer mapping and obstacle information."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "在复杂室内环境中完成定位、避障和目标位置到达，为后续机械臂作业提供可执行的底盘位置。",
            "en": "Localize, avoid obstacles, and reach target locations indoors to provide suitable base poses for manipulation."
          },
          {
            "zh": "在走廊和工作台附近持续定位并生成可通行路径，到达目标后为机械臂操作预留底盘站位。材料分别呈现融合地图、路径规划和语义感知探索，演示以室内导航过程为主。",
            "en": "The robot maintains localization and plans traversable routes near corridors and workbenches, ending at a base pose suitable for arm work. The material separately documents fused maps, planning, and semantic-perception exploration, with demonstrations focused on indoor travel."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "平台采用带升降结构的移动操作机器人，采用二维激光雷达、相机和底盘控制系统。激光和视觉观测共同构建导航所需的几何信息。",
            "en": "The slides show a mobile manipulation platform with a lift, 2D LiDAR, camera, and base controller. Laser and camera observations jointly support navigation geometry."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/agva/ppt/summary-image29.webp",
            "caption": {
              "zh": "移动操作平台结构",
              "en": "Mobile manipulation platform design"
            },
            "role": "main"
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "以二维激光和视觉点云融合建立几何导航基础，并探索将视觉语义加入代价地图。",
            "en": "The system combines 2D LiDAR and visual point clouds for geometric navigation and explores incorporating visual semantics into navigation costs."
          }
        ],
        "points": [],
        "figures": [],
        "flow": [
          {
            "zh": "激光与相机观测",
            "en": "Laser and camera observations"
          },
          {
            "zh": "点云滤波与投影",
            "en": "Point-cloud filtering and projection"
          },
          {
            "zh": "几何信息融合",
            "en": "Geometry fusion"
          },
          {
            "zh": "Cartographer 建图",
            "en": "Cartographer mapping"
          },
          {
            "zh": "导航代价地图更新",
            "en": "Navigation costmap updates"
          }
        ],
        "techniques": [
          {
            "name": {
              "zh": "视觉点云滤波与投影融合",
              "en": "Visual point-cloud filtering and projection"
            },
            "description": {
              "zh": "将相机点云滤波并投影到导航平面，与二维激光扫描融合，补充单一平面扫描难以覆盖的障碍几何。",
              "en": "Filter and project camera point clouds onto the navigation plane, fusing them with 2D laser scans to complement planar obstacle observations."
            }
          },
          {
            "name": {
              "zh": "Cartographer 与代价地图",
              "en": "Cartographer and costmaps"
            },
            "description": {
              "zh": "把融合几何输入用于定位建图，依据地图与实时障碍更新导航代价，连接目标点规划和底盘避障执行。",
              "en": "Use fused geometry for mapping and localization, update navigation costs from maps and obstacles, and connect goal planning to base-level obstacle avoidance."
            }
          },
          {
            "name": {
              "zh": "深度估计与语义导航探索",
              "en": "Depth estimation and semantic-navigation exploration"
            },
            "description": {
              "zh": "对深度、语义分割及全景分割输出进行对照，研究将物体类别和投影点云映射为导航代价；该部分按探索性工作展示。",
              "en": "Compare depth, semantic-segmentation, and panoptic-segmentation outputs and explore mapping classes and projected point clouds into navigation costs."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "实机视频补充走廊行驶、实验室绕障与接近工作台等不同场景，地图与感知图用于说明导航输入及规划过程。",
            "en": "Real-robot clips cover corridor travel, laboratory obstacle avoidance, and approach to a workbench. Maps and perception images explain the navigation inputs and planning."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/agva/ppt-09.mp4",
            "poster": "assets/projects/agva/ppt-09.poster.webp",
            "caption": {
              "zh": "实验室障碍环境中的移动导航",
              "en": "Mobile navigation among laboratory obstacles"
            },
            "row": "agva-workbench"
          },
          {
            "video": "assets/projects/agva/ppt-11.mp4",
            "poster": "assets/projects/agva/ppt-11.poster.webp",
            "caption": {
              "zh": "移动操作平台接近工作台",
              "en": "Mobile manipulator approaching a workbench"
            },
            "row": "agva-workbench"
          },
          {
            "video": "assets/projects/agva/demo.mp4",
            "poster": "assets/projects/agva/poster.webp",
            "caption": {
              "zh": "激光与视觉融合的室内走廊导航",
              "en": "Indoor corridor navigation with LiDAR–vision fusion"
            },
            "row": "agva-navigation"
          },
          {
            "video": "assets/projects/agva/ppt-10.mp4",
            "poster": "assets/projects/agva/ppt-10.poster.webp",
            "caption": {
              "zh": "室内移动操作平台运行片段",
              "en": "Indoor mobile manipulation platform in motion"
            },
            "row": "agva-navigation"
          }
        ]
      },
      {
        "id": "experiments",
        "title": {
          "zh": "建图与语义感知结果",
          "en": "Mapping and semantic-perception results"
        },
        "paragraphs": [
          {
            "zh": "图像记录了激光与视觉融合得到的室内地图，以及室内、室外场景的语义感知结果，用于观察环境几何和目标类别的表达。",
            "en": "The images record an indoor map from laser–vision fusion and semantic perception in indoor and outdoor scenes, showing the represented geometry and object categories."
          }
        ],
        "figures": [
          {
            "src": "assets/projects/agva/ppt/summary-image30.webp",
            "caption": {
              "zh": "激光与视觉融合的室内地图",
              "en": "Indoor map from laser–vision fusion"
            },
            "displayWidth": 460
          },
          {
            "src": "assets/projects/agva/ppt/summary-image42.webp",
            "caption": {
              "zh": "室内语义感知实验",
              "en": "Indoor semantic-perception experiment"
            },
            "row": "agva-semantic-results",
            "rowWidth": 640
          },
          {
            "src": "assets/projects/agva/ppt/summary-image43.webp",
            "caption": {
              "zh": "室外语义感知探索",
              "en": "Outdoor semantic-perception exploration"
            },
            "row": "agva-semantic-results",
            "rowWidth": 640
          }
        ]
      }
    ],
    "categoryKey": "navigation",
    "category": {
      "zh": "多传感器导航",
      "en": "Multi-sensor navigation"
    },
    "media": {
      "video": "assets/projects/agva/ppt-11.mp4",
      "poster": "assets/projects/agva/ppt-11.poster.webp",
      "alt": {
        "zh": "移动操作平台接近工作台",
        "en": "Mobile manipulation platform approaching a workbench"
      }
    },
    "period": {
      "zh": "2022.05—2023.03",
      "en": "May 2022–Mar 2023"
    },
    "group": "primary"
  },
  {
    "id": "sports-robot",
    "group": "collaboration",
    "title": {
      "zh": "三球一体运动机器人",
      "en": "Multi-sport robot: table tennis, badminton, and tennis"
    },
    "category": {
      "zh": "运动机器人",
      "en": "Sports robotics"
    },
    "categoryKey": "manipulation",
    "summary": {
      "zh": "面向乒乓球、羽毛球和网球对打，融合 YOLO 视觉检测、轨迹预测与协同控制；实机展示移动站位和挥拍回击。",
      "en": "For table tennis, badminton, and tennis, YOLO visual detection, trajectory prediction, and coordinated control connect mobile positioning with physical racket returns."
    },
    "media": {
      "video": "assets/projects/sports-robot/demo.mp4",
      "poster": "assets/projects/sports-robot/demo.poster.webp",
      "alt": {
        "zh": "三球一体运动机器人的乒乓球、羽毛球与网球演示",
        "en": "Multi-sport robot demonstrations in table tennis, badminton, and tennis"
      }
    },
    "facts": [
      {
        "label": {
          "zh": "参与类型",
          "en": "Involvement"
        },
        "value": {
          "zh": "参与项目",
          "en": "Collaborative project"
        }
      },
      {
        "label": {
          "zh": "演示任务",
          "en": "Demonstrations"
        },
        "value": {
          "zh": "乒乓球、羽毛球、网球",
          "en": "Table tennis, badminton, tennis"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "球类运动要求机器人在来球越过可击打区域前完成感知、判断、移动与回击。不同球类的速度、飞行规律和场地尺度不同，但都需要将来球预测与底盘、挥拍机械臂联动。",
            "en": "Ball-sport robots must sense, predict, reposition, and return a ball before it leaves the reachable zone. Different speeds, flight dynamics, and court scales require prediction to be coordinated with base and arm motion."
          },
          {
            "zh": "羽毛球尤其受到反应时间限制：若等到轨迹估计完全稳定后才移动，底盘可能来不及到位。因此采用先预测可击打区域并提前移动、再随视觉观测细化击球点的两阶段思路。",
            "en": "Badminton imposes a short reaction window: waiting for a fully stable trajectory estimate can leave too little time to reposition. A two-stage design first predicts an interception region and starts motion, then refines the hit point as observations arrive."
          }
        ],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "根据人类来球调整底盘位置、机械臂姿态与挥拍时机，在球体进入可击打空间时完成回击。演示覆盖乒乓球正反手、羽毛球和网球对打，任务关注连续感知与击球执行的衔接。",
            "en": "Adjust base position, arm pose, and racket timing from the incoming ball and return it within the reachable interception window. Demonstrations cover table-tennis forehand and backhand, badminton, and tennis."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/sports-robot/mvbmr-overview.webp",
            "caption": {
              "zh": "羽毛球感知、击球区域与场地坐标（来源：Shi 等，2025，Fig. 1）。",
              "en": "Badminton sensing, interception regions, and court coordinates (source: Shi et al., 2025, Fig. 1)."
            }
          }
        ]
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Hardware"
        },
        "paragraphs": [
          {
            "zh": "实机由移动底盘、挥拍机械臂和球拍组成，针对三类球运动使用相应球拍与场地配置。设备图截取自项目演示视频，展示平台与挥拍机构。",
            "en": "The physical system combines a mobile base, striking arm, and sport-specific rackets and court setups. The hardware image is a still from the supplied demonstration."
          },
          {
            "zh": "羽毛球感知链路结合双目视觉与球拍端 IMU：视觉提供球体三维位置和轨迹，运动传感补充人类击球瞬间的球拍姿态与速度信息。",
            "en": "The badminton sensing pipeline combines stereo vision with a racket-mounted IMU: vision provides 3D ball positions and trajectories, while motion sensing supplies racket orientation and velocity at the player’s stroke."
          }
        ],
        "figures": [
          {
            "src": "assets/projects/sports-robot/platform.webp",
            "role": "main",
            "caption": {
              "zh": "三球一体运动机器人实机（视频截图）",
              "en": "Multi-sport robot hardware, from the supplied video"
            }
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "运动控制采用“提前判断运动区域、持续细化击球点”的两阶段结构，将感知预测与底盘、机械臂控制配合起来。",
            "en": "A two-stage design estimates an interception region early and continually refines the hit point, coordinating perception with base and arm control."
          }
        ],
        "figures": [
          {
            "src": "assets/projects/sports-robot/sensing-control-architecture.webp",
            "caption": {
              "zh": "视觉–惯性融合与两阶段预测控制架构（来源：Shi 等，2025，Fig. 2）。",
              "en": "Vision–inertial fusion and two-stage prediction/control architecture (source: Shi et al., 2025, Fig. 2)."
            },
            "displayWidth": 740
          }
        ],
        "source": {
          "url": "https://doi.org/10.1016/j.inffus.2025.103337",
          "label": {
            "zh": "方法资料：运动与视觉融合的羽毛球机器人",
            "en": "Method details: motion–vision fusion for badminton robotics"
          }
        },
        "points": [],
        "techniques": [
          {
            "name": {
              "zh": "YOLO 检测与双目三维轨迹",
              "en": "YOLO detection and stereo trajectories"
            },
            "description": {
              "zh": "识别球体并获取带时间戳的三维位置序列，结合连续观测估计运动状态，为后续落点和击球点预测提供输入。",
              "en": "Detect the ball and obtain timestamped 3D positions, estimating motion state from successive observations for landing and hit-point prediction."
            }
          },
          {
            "name": {
              "zh": "SEPNet 视觉–运动融合早期预测",
              "en": "SEPNet early vision–motion prediction"
            },
            "description": {
              "zh": "羽毛球分支融合球体位置/速度和球拍 IMU 姿态/速度，提前预测可击打区域；SEPNet 通过区域分类辅助击球区域中心回归，争取底盘移动时间。",
              "en": "For badminton, combine ball position and velocity with racket-IMU orientation and velocity to predict a hit region early. SEPNet uses region classification to assist center regression and gain repositioning time."
            }
          },
          {
            "name": {
              "zh": "最小二乘拟合与 MLP 轨迹修正",
              "en": "Least-squares fitting and MLP trajectory refinement"
            },
            "description": {
              "zh": "随视觉轨迹积累，用最小二乘拟合已观测位置与速度，并以 MLP 估计轨迹模型参数，持续更新后续飞行轨迹和可达击球点。",
              "en": "As visual trajectories accumulate, fit observed positions and velocities with least squares and estimate trajectory-model parameters with an MLP, continually updating the flight prediction and reachable interception point."
            }
          },
          {
            "name": {
              "zh": "PID 启动与 NMPC 协同控制",
              "en": "PID startup and coordinated NMPC"
            },
            "description": {
              "zh": "前段以 PID 驱动平台向预测区域移动，后段通过非线性模型预测控制协调底盘和机械臂，联合约束击球位置、球拍朝向与击球速度。",
              "en": "Start platform motion toward the predicted region with PID, then coordinate the base and arm through nonlinear MPC, jointly considering hit position, racket orientation, and striking velocity."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations"
        },
        "paragraphs": [
          {
            "zh": "演示分别展示乒乓球的正反手与连续回击，以及羽毛球、网球场景中的移动站位与挥拍对打。",
            "en": "Demonstrations show table-tennis forehand, backhand, and successive returns, followed by mobile positioning and racket rallies in badminton and tennis settings."
          }
        ],
        "figures": [
          {
            "video": "assets/projects/sports-robot/table-tennis.mp4",
            "poster": "assets/projects/sports-robot/table-tennis.poster.webp",
            "caption": {
              "zh": "乒乓球：正反手与人机对打",
              "en": "Table tennis: forehand, backhand, and rallies"
            }
          },
          {
            "video": "assets/projects/sports-robot/badminton.mp4",
            "poster": "assets/projects/sports-robot/badminton.poster.webp",
            "caption": {
              "zh": "羽毛球：移动与人机对打",
              "en": "Badminton: positioning and rallies"
            }
          },
          {
            "video": "assets/projects/sports-robot/tennis.mp4",
            "poster": "assets/projects/sports-robot/tennis.poster.webp",
            "caption": {
              "zh": "网球：实机场地对打",
              "en": "Tennis: physical court rallies"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "fruit-sorting",
    "title": {
      "zh": "果蔬干分拣产线项目",
      "en": "Dried-fruit sorting pilot line"
    },
    "summary": {
      "zh": "面向果蔬干产线的识别、分拣与计数，结合视觉定位、四自由度机械臂抓放和产线协同控制；完成产线联调及预研验收。",
      "en": "For dried-fruit and vegetable sorting and counting, visual localization, a four-degree-of-freedom arm, and line coordination are integrated; the pilot line completed commissioning and acceptance."
    },
    "facts": [
      {
        "label": {
          "zh": "合作单位",
          "en": "Partner"
        },
        "value": {
          "zh": "安徽安粮控股股份公司",
          "en": "Anhui ANLIANG Holdings"
        }
      },
      {
        "label": {
          "zh": "本人职责",
          "en": "Role"
        },
        "value": {
          "zh": "识别定位、机械臂抓放与计数等核心模块",
          "en": "Core perception, arm pick-and-place, and counting modules"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "预研产线需要把视觉识别结果转化为可执行的分拣动作，并与输送和其他机械结构按顺序协作。",
            "en": "The pilot line requires visual detections to drive sorting actions in coordination with conveyors and other mechanisms."
          },
          {
            "zh": "产线运行要求感知、机械臂和输送设备按顺序配合：目标位置变化、抓取时机与设备状态不一致都会影响作业连续性。项目重点是把视觉分拣流程与现场硬件逻辑连通。",
            "en": "Line operation requires coordinated sensing, robot motion, and conveying: target movement, picking timing, and equipment state affect continuity. The focus is integrating visual sorting with the pilot line’s hardware logic."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "识别并定位果蔬干，控制机械臂抓取后放置到指定区域，记录处理数量并与产线硬件逻辑交互。",
            "en": "Detect and localize dried fruit, pick and place items in target areas, count processed items, and coordinate with line logic."
          },
          {
            "zh": "围绕目标识别定位、机械臂取放、处理计数和设备联动完成流程调试，在现场预研平台检查各环节的输入输出与执行顺序。",
            "en": "Detection and localization, arm pick-and-place, processing counts, and equipment coordination are commissioned together on the pilot platform, checking data interfaces and execution order."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "系统采用四自由度机械臂、视觉采集与计算单元及配套产线机械。",
            "en": "The system uses a four-degree-of-freedom arm, vision/computing hardware, and the associated line mechanisms."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "以视觉目标位置和设备状态为接口，连接四自由度机械臂取放、计数与产线机构联动。",
            "en": "Visual target positions and device states connect four-DoF pick-and-place with counting and production-line coordination."
          }
        ],
        "points": [],
        "figures": [],
        "techniques": [
          {
            "name": {
              "zh": "视觉识别定位与坐标对应",
              "en": "Visual localization and coordinate mapping"
            },
            "description": {
              "zh": "识别产线上的果蔬干目标，将图像位置对应到机械臂可操作的位置，给出取放动作的目标输入。",
              "en": "Recognize dried-fruit targets on the line and map image locations to reachable arm positions for pick-and-place."
            }
          },
          {
            "name": {
              "zh": "四自由度机械臂取放控制",
              "en": "Four-DoF arm pick-and-place"
            },
            "description": {
              "zh": "根据目标位置求解机械臂姿态，按接近、抓取、搬运和放置组织运动，衔接夹爪与关节动作。",
              "en": "Compute arm poses from target locations and sequence approach, grasp, transfer, and placement with coordinated gripper and joint motion."
            }
          },
          {
            "name": {
              "zh": "计数逻辑与产线状态联动",
              "en": "Counting logic and line-state coordination"
            },
            "description": {
              "zh": "在取放流程中记录处理数量，根据机械臂和其他机构状态切换执行阶段，联调设备间的等待、动作及完成关系。",
              "en": "Count processed objects within the pick-and-place workflow and transition execution from arm and mechanism states, coordinating waits, actions, and completion across devices."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "该预研产线已通过验收，现场视频展示机械臂与产线协同。",
            "en": "The slides record acceptance of the pilot line, with on-site footage showing the arm and equipment."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/fruit-sorting/ppt/summary-image123.webp",
            "caption": {
              "zh": "预研产线现场展示",
              "en": "On-site pilot-line demonstration"
            }
          },
          {
            "video": "assets/projects/fruit-sorting/demo.mp4",
            "poster": "assets/projects/fruit-sorting/poster.webp",
            "caption": {
              "zh": "果蔬干预研产线现场演示",
              "en": "On-site demonstration of the dried-fruit pilot line"
            }
          },
          {
            "src": "assets/projects/fruit-sorting/ppt/summary-image122.webp",
            "caption": {
              "zh": "果蔬干目标识别与定位画面",
              "en": "Dried-fruit detection and localization"
            }
          }
        ]
      }
    ],
    "categoryKey": "manipulation",
    "category": {
      "zh": "工业分拣",
      "en": "Industrial sorting"
    },
    "media": {
      "video": "assets/projects/fruit-sorting/demo.mp4",
      "poster": "assets/projects/fruit-sorting/poster.webp",
      "alt": {
        "zh": "果蔬干分拣产线现场演示",
        "en": "Dried-fruit sorting line demonstration"
      }
    },
    "organization": {
      "zh": "安徽安粮控股股份公司",
      "en": "Anhui ANLIANG Holdings"
    },
    "group": "collaboration"
  },
  {
    "id": "wheel-legged",
    "title": {
      "zh": "轮腿平衡机器人原型测试",
      "en": "Wheeled-legged balancing robot prototype"
    },
    "summary": {
      "zh": "面向轮腿平台姿态平衡，采用 PPO 强化学习训练控制策略，将状态反馈与执行器控制衔接；实机展示平衡与短距离运动。",
      "en": "For wheeled-legged balance, PPO reinforcement learning trains a feedback control policy; the physical prototype demonstrates balancing and short-range motion."
    },
    "facts": [],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "双轮支撑使机身姿态与运动相互耦合，平台移动和腿部结构变化都会影响平衡。项目采用强化学习训练平衡策略，将连续姿态反馈与机器人执行机构连接起来。",
            "en": "With two-wheel support, posture and motion are coupled, and movement or leg-configuration changes affect balance. Reinforcement learning trains a policy connecting continuous state feedback to robot actuation."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "训练轮腿机器人的平衡控制策略，使原型能够保持直立，并在短距离运动中维持姿态稳定。实机演示用于观察站立、姿态变化及移动响应。",
            "en": "Train a balance policy that maintains upright posture and stability during short-range movement. The physical clip documents standing balance, posture changes, and motion response."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Prototype hardware"
        },
        "paragraphs": [
          {
            "zh": "视频展示双轮与腿部结构组成的机器人原型。",
            "en": "The video shows a robot prototype with two wheels and leg structures."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/wheel-legged/ppt/summary-image129.webp",
            "caption": {
              "zh": "轮腿平衡原型实机测试",
              "en": "Physical test of the wheeled-legged balancing prototype"
            },
            "role": "main"
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "以 PPO（近端策略优化）训练平衡控制策略，围绕状态观测、策略更新和原型执行构成控制流程。",
            "en": "PPO (Proximal Policy Optimization) trains the balancing policy through state observations, policy updates, and prototype execution."
          }
        ],
        "figures": [],
        "points": [],
        "techniques": [
          {
            "name": {
              "zh": "平衡控制的状态与动作建模",
              "en": "State and action modeling for balance"
            },
            "description": {
              "zh": "将机身姿态、运动变化与轮腿状态作为平衡决策依据，把策略输出映射为平台执行器指令，连接状态反馈和姿态调节。",
              "en": "Use body posture, motion changes, and wheel–leg state for balance decisions, mapping policy outputs into actuator commands that close the feedback loop."
            }
          },
          {
            "name": {
              "zh": "PPO 策略与价值学习",
              "en": "PPO policy and value learning"
            },
            "description": {
              "zh": "通过交互轨迹更新控制策略与价值估计，利用 PPO 的裁剪目标约束过大的策略变化；训练目标围绕维持直立和运动稳定性组织。",
              "en": "Update the control policy and value estimate from interaction trajectories, using PPO’s clipped objective to limit excessive policy changes while optimizing upright stability."
            }
          },
          {
            "name": {
              "zh": "闭环推理与原型调试",
              "en": "Closed-loop inference and prototype integration"
            },
            "description": {
              "zh": "根据当前状态持续进行策略推理并执行动作，结合实机姿态和运动响应检查控制链路，展示轮腿原型上的平衡效果。",
              "en": "Infer actions continually from current state and execute them in a loop, checking the integration against observed posture and motion responses on the physical prototype."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstration"
        },
        "paragraphs": [
          {
            "zh": "实机演示展示轮腿原型的平衡姿态和运动响应，用于观察训练策略在机器人上的闭环执行。",
            "en": "The physical clip shows balancing posture and motion response, illustrating closed-loop execution of the trained policy on the prototype."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/wheel-leg/ppt-45.mp4",
            "poster": "assets/projects/wheel-leg/ppt-45.poster.webp",
            "caption": {
              "zh": "轮腿机器人平衡原型完整短片",
              "en": "Full short clip of the wheel-legged balance prototype"
            }
          }
        ]
      }
    ],
    "categoryKey": "exploration",
    "category": {
      "zh": "机器人原型",
      "en": "Robotics prototype"
    },
    "media": {
      "video": "assets/projects/wheel-leg/ppt-45.mp4",
      "poster": "assets/projects/wheel-leg/ppt-45.poster.webp",
      "alt": {
        "zh": "轮腿机器人平衡测试",
        "en": "Wheel-legged robot balance test"
      }
    },
    "group": "collaboration"
  },
  {
    "id": "industrial-grasping",
    "title": {
      "zh": "柔性与不规则物料抓取实验",
      "en": "Flexible and irregular material manipulation"
    },
    "summary": {
      "zh": "面向服装、食品等柔性与不规则物料操作，结合不同夹爪和机械臂开展抓取实验；多段实机演示展示夹持、搬移与处理过程。",
      "en": "For handling clothing, food, and other deformable or irregular objects, experiments combine different grippers and robot arms; real clips demonstrate grasping, transfer, and material handling."
    },
    "facts": [],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "柔性与不规则目标在形态、接触位置和可抓取区域上存在较大变化，需要通过实物测试观察夹持和搬移行为。",
            "en": "Flexible and irregular objects vary in shape, contact, and graspable regions, motivating physical tests of holding and transfer."
          },
          {
            "zh": "与规则刚性物体相比，服装和食品物料更容易在接触后发生形变，抓取点选择和夹持方式会改变后续搬移行为。实物测试用于比较不同末端工具与材料的适配情况。",
            "en": "Clothing and food materials deform on contact, so grasp location and holding method influence transfer behavior. Physical trials examine how different end-effectors interact with the materials."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "对工作台上的目标执行抓取、转移或材料处理动作，覆盖服装与食品物料等不同形态。",
            "en": "Grasp, transfer, or process workbench objects across clothing and food-material settings."
          },
          {
            "zh": "在不同夹爪和机械臂配置下观察目标能否被夹持、提起和转移，记录柔性材料在操作中的形态变化；演示按服装抓取、食品物料与工作台处理分项呈现。",
            "en": "Tests observe holding, lifting, and transfer under different gripper and arm configurations, including material deformation. Demonstrations are organized into clothing grasping, food materials, and workbench handling."
          }
        ],
        "points": [],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Robot hardware"
        },
        "paragraphs": [
          {
            "zh": "实验配置包含不同机械臂、夹爪、工作台及食品处理装置。",
            "en": "The slides show experiments using different arms, grippers, workbenches, and food-processing fixtures."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/projects/industrial-grasping/ppt/summary-image125.webp",
            "caption": {
              "zh": "机械臂与物料处理实验装置",
              "en": "Arm and material-handling setup"
            },
            "role": "main",
            "row": "industrial-hardware"
          },
          {
            "src": "assets/projects/industrial-grasping/ppt/summary-image128.webp",
            "caption": {
              "zh": "机械臂夹持与工作台配置",
              "en": "Gripper and workbench setup"
            },
            "row": "industrial-hardware"
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "关键技术围绕物料形态、末端接触几何与机械臂运动执行展开，分别组织服装和食品等对象的抓取过程。",
            "en": "The technical work connects material shape, end-effector contact geometry, and arm execution for clothing, food, and other irregular objects."
          }
        ],
        "points": [],
        "figures": [],
        "techniques": [
          {
            "name": {
              "zh": "物料几何与抓握位姿选择",
              "en": "Object geometry and grasp-pose selection"
            },
            "description": {
              "zh": "根据目标形态、可夹持部位及接近空间选择抓握位置和方向，考虑柔性材料在提拉时的变形及不规则物体的接触关系。",
              "en": "Select grasp positions and directions from object shape, accessible regions, and approach space, accounting for deformation and irregular contact geometry."
            }
          },
          {
            "name": {
              "zh": "机械臂运动学与分段轨迹",
              "en": "Arm kinematics and staged trajectories"
            },
            "description": {
              "zh": "将末端接近、夹取、抬升和搬移组织为连续动作段，结合机械臂位姿求解与夹爪开闭完成物料转移。",
              "en": "Organize approach, grasp, lift, and transfer into motion segments, combining arm-pose computation with gripper actuation."
            }
          },
          {
            "name": {
              "zh": "末端工具匹配与操作联调",
              "en": "End-effector matching and integration"
            },
            "description": {
              "zh": "针对不同物料与机械臂/夹爪配置调整动作顺序和接触方式，通过实机记录检查夹持、搬移与材料处理过程。",
              "en": "Adapt sequencing and contact to different materials and arm–gripper setups, examining gripping, transfer, and material handling through physical trials."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstrations and results"
        },
        "paragraphs": [
          {
            "zh": "补充不同实验配置下的实机操作短片，展示物料抓取和搬移过程。",
            "en": "Supplementary robot clips show material handling across the experimental configurations."
          }
        ],
        "points": [],
        "figures": [
          {
            "video": "assets/projects/industrial-grasping/ppt-41.mp4",
            "poster": "assets/projects/industrial-grasping/ppt-41.poster.webp",
            "caption": {
              "zh": "柔性服装物料抓取与搬移",
              "en": "Grasping and transfer of flexible clothing material"
            }
          },
          {
            "video": "assets/projects/industrial-grasping/ppt-42.mp4",
            "poster": "assets/projects/industrial-grasping/ppt-42.poster.webp",
            "caption": {
              "zh": "食品物料操作实验（一）",
              "en": "Food-material manipulation experiment I"
            }
          },
          {
            "video": "assets/projects/industrial-grasping/ppt-43.mp4",
            "poster": "assets/projects/industrial-grasping/ppt-43.poster.webp",
            "caption": {
              "zh": "食品物料操作实验（二）",
              "en": "Food-material manipulation experiment II"
            }
          },
          {
            "video": "assets/projects/industrial-grasping/ppt-44.mp4",
            "poster": "assets/projects/industrial-grasping/ppt-44.poster.webp",
            "caption": {
              "zh": "夹爪与机械臂近景测试",
              "en": "Close-up gripper and arm test"
            }
          },
          {
            "src": "assets/projects/industrial-grasping/ppt/summary-image126.webp",
            "caption": {
              "zh": "食品物料操作实验",
              "en": "Food-material manipulation experiment"
            }
          },
          {
            "src": "assets/projects/industrial-grasping/ppt/summary-image127.webp",
            "caption": {
              "zh": "食品处理设备与机械臂操作",
              "en": "Food-processing fixture and arm operation"
            }
          }
        ]
      }
    ],
    "categoryKey": "manipulation",
    "category": {
      "zh": "机器人操作实验",
      "en": "Robot manipulation experiments"
    },
    "media": {
      "video": "assets/projects/industrial-grasping/demo.mp4",
      "poster": "assets/projects/industrial-grasping/poster.webp",
      "alt": {
        "zh": "机械臂抓取服装的实验视频",
        "en": "Robot arm clothing-grasping experiment"
      }
    },
    "group": "primary"
  },
  {
    "id": "chess-grasping",
    "group": "collaboration",
    "categoryKey": "manipulation",
    "category": {
      "zh": "视觉操作",
      "en": "Visual manipulation"
    },
    "title": {
      "zh": "机械臂棋子视觉抓取",
      "en": "Robotic visual grasping of game pieces"
    },
    "summary": {
      "zh": "面向棋盘上小尺寸棋子抓取，以 YOLO 识别目标、MoveIt 规划机械臂运动；实机展示棋子定位、夹持和搬移。",
      "en": "For small game-piece pickup, YOLO detects targets and MoveIt plans arm motion; real demonstrations show localization, gripping, and transfer."
    },
    "media": {
      "video": "assets/projects/chess-grasping/demo.mp4",
      "poster": "assets/projects/chess-grasping/demo.poster.webp",
      "alt": {
        "zh": "机械臂在棋盘上执行棋子抓取",
        "en": "Robot-arm piece pickup on a game board"
      }
    },
    "facts": [
      {
        "label": {
          "zh": "参与类型",
          "en": "Involvement"
        },
        "value": {
          "zh": "参与项目",
          "en": "Collaborative project"
        }
      },
      {
        "label": {
          "zh": "操作对象",
          "en": "Objects"
        },
        "value": {
          "zh": "棋盘与棋子",
          "en": "Game board and pieces"
        }
      }
    ],
    "sections": [
      {
        "id": "background",
        "title": {
          "zh": "项目背景",
          "en": "Background"
        },
        "paragraphs": [
          {
            "zh": "棋子尺寸小、形状相近，棋盘纹理与夹爪接近方向都会影响视觉定位和抓取。任务需要把相机观察到的目标位置转换为机械臂可执行的动作，并处理夹爪与棋盘之间的空间关系。",
            "en": "Small, similarly shaped pieces and a patterned board challenge visual localization and grasp approach. The task connects camera-observed targets with executable arm motion while accounting for the gripper’s clearance above the board."
          }
        ],
        "figures": []
      },
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "在棋盘区域选定并定位目标棋子，使夹爪从合适方向接近、夹住并抬离棋盘，随后移动到指定位置。任务重点是小目标抓取和棋盘上方的安全操作。",
            "en": "Select and localize a target piece, approach from a suitable direction, grasp and lift it from the board, and transfer it to a destination. The task focuses on small-object pickup and safe motion above the board."
          }
        ],
        "figures": []
      },
      {
        "id": "equipment",
        "title": {
          "zh": "设备说明",
          "en": "Hardware"
        },
        "paragraphs": [
          {
            "zh": "实机包含协作机械臂、末端夹爪和棋盘工作台。视频从近距离观察夹爪与棋子的相对位置及接触过程。",
            "en": "The setup comprises a collaborative arm, an end-effector gripper, and a board workspace. A close view documents the relative positions and contact between the gripper and piece."
          }
        ],
        "figures": [
          {
            "src": "assets/projects/chess-grasping/demo.poster.webp",
            "role": "main",
            "caption": {
              "zh": "协作机械臂与棋盘抓取工作区。",
              "en": "Collaborative arm and board-grasping workspace."
            }
          }
        ]
      },
      {
        "id": "system",
        "title": {
          "zh": "系统和关键技术",
          "en": "System and key technologies"
        },
        "paragraphs": [
          {
            "zh": "视觉模块负责识别目标，MoveIt 负责将抓取目标转成机械臂运动，夹爪控制完成实际夹持。",
            "en": "Vision identifies the target, MoveIt converts the grasp goal into arm motion, and gripper control executes the physical pickup."
          }
        ],
        "figures": [],
        "points": [],
        "techniques": [
          {
            "name": {
              "zh": "YOLO 棋子目标检测",
              "en": "YOLO game-piece detection"
            },
            "description": {
              "zh": "从相机画面中识别棋子并获得目标位置，将小尺寸目标与棋盘背景区分，为抓取位姿计算提供视觉输入。",
              "en": "Detect pieces in camera images and obtain target positions, separating small objects from the board background for grasp-pose computation."
            }
          },
          {
            "name": {
              "zh": "坐标变换与抓取位姿",
              "en": "Coordinate transformation and grasp poses"
            },
            "description": {
              "zh": "将视觉定位结果转换到机械臂坐标系，结合棋子高度、夹爪开口与接近方向确定末端目标位姿。",
              "en": "Transform visual target positions into the arm frame and determine end-effector goals from piece height, gripper opening, and approach direction."
            }
          },
          {
            "name": {
              "zh": "MoveIt 逆运动学与运动规划",
              "en": "MoveIt inverse kinematics and motion planning"
            },
            "description": {
              "zh": "根据末端目标求解关节运动并规划轨迹，结合碰撞检查组织接近和抬升路径，处理夹爪与棋盘的空间约束。",
              "en": "Solve joint motion for end-effector goals and plan trajectories, using collision checks to organize approach and lifting around board-clearance constraints."
            }
          },
          {
            "name": {
              "zh": "机械臂与夹爪动作衔接",
              "en": "Arm–gripper sequencing"
            },
            "description": {
              "zh": "按预抓取、接近、夹紧、抬升和搬移分段执行，协调轨迹到位与夹爪开闭，使识别结果连接到完整取放动作。",
              "en": "Sequence pre-grasp, approach, closure, lifting, and transfer, coordinating arm arrival with gripper actuation to complete the pick-and-place action."
            }
          }
        ]
      },
      {
        "id": "demo",
        "title": {
          "zh": "演示与结果",
          "en": "Demonstration"
        },
        "paragraphs": [
          {
            "zh": "实机演示展示棋子视觉抓取过程，包括夹爪对准、接近、夹持和抬升，连接目标定位与机械臂取放动作。",
            "en": "The physical demonstration shows visually guided piece pickup, including alignment, approach, gripping, and lifting, connecting target localization with arm manipulation."
          }
        ],
        "figures": [
          {
            "video": "assets/projects/chess-grasping/demo.mp4",
            "poster": "assets/projects/chess-grasping/demo.poster.webp",
            "caption": {
              "zh": "棋子视觉定位与机械臂抓取实机演示。",
              "en": "Physical demonstration of visual piece localization and robot-arm grasping."
            }
          }
        ]
      }
    ]
  }
];
