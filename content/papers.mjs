// Paper content; original tables and figures are displayed without full unpublished PDFs.
export const papers = [
  {
    "id": "kangaroo-paper",
    "title": {
      "zh": "Kangaroo: Demand-Driven Cross-Environment Navigation for Macro-Micro Vehicles Enhanced by Large Language Models",
      "en": "Kangaroo: Demand-Driven Cross-Environment Navigation for Macro-Micro Vehicles Enhanced by Large Language Models"
    },
    "authors": "Wendong Guo, Yanwei Zheng*, Junyi Wang, Mengbai Xiao, Xiao Zhang, Liang Ma, Dongxiao Yu",
    "year": "",
    "venue": {
      "zh": "Engineering Applications of Artificial Intelligence",
      "en": "Engineering Applications of Artificial Intelligence"
    },
    "venueShort": {
      "zh": "EAAI",
      "en": "EAAI"
    },
    "image": "assets/papers/kangaroo-scenario.webp",
    "figureAlt": {
      "zh": "Kangaroo 需求驱动的子母车跨环境导航任务",
      "en": "Demand-driven macro–micro vehicle navigation in Kangaroo"
    },
    "summary": {
      "zh": "面向跨室内外的子母车协作导航，以大语言模型反馈规划和多传感器 SLAM 衔接大范围运输与狭窄空间任务；两类真实场景成功率为85–88%和78–81%。",
      "en": "For macro–micro navigation across indoor and outdoor spaces, language-model feedback planning and multi-sensor SLAM connect long-range transport with confined-space tasks; success rates are 85–88% and 78–81% in two real-world settings."
    },
    "sections": [
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "机器人需要从“我想喝水”等自然需求中确定服务目标，并连续穿越室外道路、宽阔大厅和窄通道。大车适合长距离运输，小车便于进入受限区域，因此任务同时涉及需求理解、车辆分工和跨环境导航。",
            "en": "A robot must translate natural demands such as “I am thirsty” into service goals and traverse outdoor roads, large halls, and narrow passages. A macro vehicle handles long-range transport, while a micro vehicle enters confined spaces; the task requires demand understanding, role allocation, and continuous navigation."
          },
          {
            "zh": "系统接收需求指令与场景知识，生成两车可执行的运动原语。母车到达释放点后，子车离车执行末端任务，再通过协同感知与对接完成任务衔接。",
            "en": "The system receives a demand and environmental knowledge and generates executable motion primitives for both vehicles. The macro vehicle transports the micro vehicle to a release point; the micro vehicle performs the last-mile task, supported by collaborative perception and docking."
          }
        ],
        "points": [],
        "figures": [],
        "metrics": []
      },
      {
        "id": "contributions",
        "title": {
          "zh": "主要贡献",
          "en": "Main Contributions"
        },
        "paragraphs": [],
        "points": [
          {
            "zh": "建立子母车跨环境协作框架，将大范围运输能力与狭窄空间通行能力结合。",
            "en": "A macro–micro vehicle framework connects long-range transport with access to confined spaces."
          },
          {
            "zh": "设计迭代反馈规划器 IF-Planner，将人的意图澄清、外部场景知识和规则校验接入大语言模型的运动原语生成。",
            "en": "IF-Planner combines human intent clarification, external scene knowledge, and rule validation with language-model motion-primitive generation."
          },
          {
            "zh": "构建真实子母车平台，以混合 SLAM、双通道通信、协同感知及视觉–LiDAR 对接支持规划执行。",
            "en": "A physical platform uses hybrid SLAM, dual-channel communication, collaborative perception, and visual–LiDAR docking to execute the generated plan."
          }
        ],
        "figures": [
          {
            "src": "assets/papers/kangaroo-scenario.webp",
            "caption": {
              "zh": "需求驱动的跨环境导航示意：母车运输、子车释放与小尺度区域执行。",
              "en": "Demand-driven navigation: macro transport, micro-vehicle release, and execution in confined spaces."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "method",
        "title": {
          "zh": "方法架构",
          "en": "Method Architecture"
        },
        "paragraphs": [
          {
            "zh": "IF-Planner 先通过交互模块解析需求，再结合场景知识生成动作序列。规则校验器检查原语一致性、时序关系、硬件约束和边界情况，把错误反馈给生成器迭代修正，最终得到动作与目标组成的原语。",
            "en": "IF-Planner first clarifies a demand through interaction, then generates an action sequence using scene knowledge. A rule validator checks primitive consistency, temporal relations, hardware constraints, and edge cases. Validation feedback iteratively revises the sequence into executable action–goal primitives."
          },
          {
            "zh": "导航层分别采用适应大尺度环境的三维 SLAM 与适应狭小空间的二维 SLAM，并通过地图管理和协同感知共享环境信息。通信、任务分配与视觉–LiDAR 对接共同协调两车的移动与接驳。",
            "en": "The navigation layer uses 3D SLAM for large environments and 2D SLAM for confined spaces, with map management and collaborative perception sharing environmental information. Communication, task allocation, and visual–LiDAR docking coordinate movement and vehicle transfers."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/kangaroo-architecture.webp",
            "caption": {
              "zh": "系统架构：IF-Planner、子母车导航控制器与执行层。",
              "en": "Architecture comprising IF-Planner, the macro–micro navigation controller, and the execution layer."
            }
          },
          {
            "src": "assets/papers/kangaroo-ifplanner.webp",
            "caption": {
              "zh": "IF-Planner 的知识、交互、规则校验与原语生成流程。",
              "en": "IF-Planner integrates prior knowledge, interaction, rule validation, and primitive generation."
            },
            "displayWidth": 620
          },
          {
            "src": "assets/papers/kangaroo-platform.webp",
            "caption": {
              "zh": "论文中的子母车硬件平台及传感器配置。",
              "en": "Macro–micro hardware platform and sensor configuration."
            },
            "displayWidth": 620
          }
        ],
        "metrics": []
      },
      {
        "id": "results",
        "title": {
          "zh": "实验结果",
          "en": "Experiments and Results"
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
            "src": "assets/papers/kangaroo-scenes.webp",
            "caption": {
              "zh": "两个真实跨环境场景中的指令、动作原语和连续执行过程。",
              "en": "Instructions, generated primitives, and execution sequences in two real cross-environment scenarios."
            }
          },
          {
            "src": "assets/papers/kangaroo-results.webp",
            "caption": {
              "zh": "论文原表 Table 5：两类跨环境场景与四类需求任务的系统比较。",
              "en": "Original Table 5: systems across two environments and four demand types."
            },
            "kind": "table",
            "displayWidth": 900
          }
        ],
        "metrics": [],
        "layout": "full"
      }
    ],
    "links": [],
    "rankings": [
      {
        "label": {
          "zh": "中科院1区",
          "en": "CAS Zone 1"
        }
      }
    ]
  },
  {
    "id": "sctnav",
    "title": {
      "zh": "SCTNav: Scene-Constrained Monocular Navigation with Ternary Spatio-Temporal Waypoint Prediction",
      "en": "SCTNav: Scene-Constrained Monocular Navigation with Ternary Spatio-Temporal Waypoint Prediction"
    },
    "authors": "Wendong Guo, Junyi Wang, Yanwei Zheng*, Xiao Zhang, Xingyu Zhang, Dongxiao Yu",
    "year": "",
    "venue": {
      "zh": "IEEE Robotics and Automation Letters",
      "en": "IEEE Robotics and Automation Letters"
    },
    "venueShort": {
      "zh": "IEEE RA-L",
      "en": "IEEE RA-L"
    },
    "image": "assets/papers/sctnav-framework.webp",
    "figureAlt": {
      "zh": "SCTNav 三元时空路点预测与场景约束控制框架",
      "en": "SCTNav ternary waypoint prediction and scene-constrained control"
    },
    "summary": {
      "zh": "面向仅用单目 RGB 的图像目标导航，通过三元时空路点预测与场景约束 MPC 连接视觉规划和运动控制；仿真成功率98.0%，三类真实场景平均90.8%。",
      "en": "For monocular RGB image-goal navigation, ternary spatiotemporal waypoint prediction and scene-constrained MPC connect visual planning with motion control; success is 98.0% in simulation and averages 90.8% across three real settings."
    },
    "sections": [
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "给定一张目标位置的图像，机器人仅使用单目 RGB 观测导航到目标。机器人需要从视觉序列理解运动和场景结构，并把视觉路点转化为符合自身运动学的速度指令。",
            "en": "Given an image depicting a goal location, a robot navigates to it using monocular RGB observations. It must infer motion and scene structure from visual sequences and convert predicted waypoints into velocity commands compatible with its kinematics."
          },
          {
            "zh": "任务中的主要困难包括重复纹理、局部可观测性、环境尺度变化，以及路点预测与真实运动约束之间的偏差。实验覆盖受限房间、长走廊和开放校园。",
            "en": "The task involves repetitive appearances, partial observability, changes in environmental scale, and a gap between visual waypoint prediction and physical motion constraints. Evaluation covers confined rooms, long corridors, and an open campus."
          }
        ],
        "points": [],
        "figures": [],
        "metrics": []
      },
      {
        "id": "contributions",
        "title": {
          "zh": "主要贡献",
          "en": "Main Contributions"
        },
        "paragraphs": [],
        "points": [
          {
            "zh": "P3Net 显式区分过去观测、当前画面与未来目标，学习具有不同时间角色的导航信息。",
            "en": "P3Net explicitly distinguishes past observations, the current view, and a prospective goal to learn navigation information with distinct temporal roles."
          },
          {
            "zh": "SCMPC 从单目序列恢复度量一致的局部三维场景，将障碍物、运动学和轨迹平滑纳入模型预测控制。",
            "en": "SCMPC reconstructs a metric-consistent local 3D scene from monocular sequences and incorporates obstacles, kinematics, and smoothness into model predictive control."
          },
          {
            "zh": "将学习式路点预测与显式控制优化结合，并验证 SCMPC 对多种导航策略的适用性。",
            "en": "Learned waypoint prediction is paired with explicit control optimization, with SCMPC also evaluated across multiple navigation policies."
          }
        ],
        "figures": [
          {
            "src": "assets/papers/sctnav-motivation.webp",
            "caption": {
              "zh": "动机：连接三元时空视觉理解与安全、可执行的运动控制。",
              "en": "Motivation: connect ternary visual reasoning to safe, kinematically feasible motion."
            },
            "displayWidth": 760
          }
        ],
        "metrics": []
      },
      {
        "id": "method",
        "title": {
          "zh": "方法架构",
          "en": "Method Architecture"
        },
        "paragraphs": [
          {
            "zh": "P3Net 用双向状态空间模型编码过去和当前观测之间的时空关系，再以目标图像为条件，通过交叉注意力融合当前状态与目标相关信息，同时预测距离和未来路点。",
            "en": "P3Net encodes spatio-temporal relations between past and current observations using a bidirectional state-space model. Goal-conditioned cross-attention then fuses the current state with target-relevant information to predict distance and future waypoints."
          },
          {
            "zh": "SCMPC 估计序列深度和相机运动，构建度量一致的局部点云与障碍表示。非线性 MPC 依据差速运动学，在目标跟踪、控制平滑与障碍代价之间优化，滚动输出线速度和角速度。",
            "en": "SCMPC estimates sequence depth and camera motion to construct local metric point clouds and obstacle representations. Nonlinear MPC follows differential-drive kinematics and balances goal tracking, control smoothness, and obstacle costs to output linear and angular velocities."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/sctnav-framework.webp",
            "caption": {
              "zh": "整体框架：P3Net 预测距离与路点，SCMPC 优化运动。",
              "en": "P3Net predicts distance and waypoints; SCMPC optimizes executable motion."
            }
          },
          {
            "src": "assets/papers/sctnav-scmpc.webp",
            "caption": {
              "zh": "SCMPC：单目场景几何、度量点云与非线性 MPC。",
              "en": "SCMPC combines monocular scene geometry, metric point clouds, and nonlinear MPC."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "results",
        "title": {
          "zh": "实验结果",
          "en": "Experiments and Results"
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
            "src": "assets/papers/sctnav-realworld.webp",
            "caption": {
              "zh": "受限房间、长走廊和开放校园的真实机器人导航。",
              "en": "Real robot navigation in confined rooms, long corridors, and an open campus."
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
        "metrics": [],
        "layout": "full"
      }
    ],
    "links": [
      {
        "label": "Project",
        "url": "https://anonymous.4open.science/w/SCTNav/index.html"
      }
    ],
    "rankings": [
      {
        "label": {
          "zh": "中科院2区",
          "en": "CAS Zone 2"
        }
      }
    ]
  },
  {
    "id": "reconav-paper",
    "title": {
      "zh": "ReCoNav: Composed Instance Navigation",
      "en": "ReCoNav: Composed Instance Navigation"
    },
    "authors": "Wendong Guo, Junyi Wang, Yanwei Zheng*, Xiao Zhang, Xingyu Zhang, Dongxiao Yu",
    "year": "",
    "venue": {
      "zh": "IEEE International Conference on Multimedia and Expo",
      "en": "IEEE International Conference on Multimedia and Expo"
    },
    "venueShort": {
      "zh": "ICME",
      "en": "ICME"
    },
    "image": "assets/papers/reconav-motivation.webp",
    "figureAlt": {
      "zh": "ReCoNav 参考图像与修正语言组合目标的导航任务",
      "en": "ReCoNav combines a reference image and modification text into a navigation goal"
    },
    "summary": {
      "zh": "面向参考图像与修改语言共同指定目标的组合导航，构建七类变化任务，以视觉匹配和语言条件策略建立免训练与学习式基线；学习式基线总体成功率27.07%。",
      "en": "For navigation to a target specified jointly by a reference image and modification text, seven edit types are evaluated using visual-matching and language-conditioned baselines; the learning baseline reaches 27.07% overall success."
    },
    "sections": [
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "用户提供的参考照片可能与当前物体存在差异，例如背包已经打开、侧边水杯被取走。机器人接收参考图像和一条相对修改指令，在未知室内环境中探索，找到满足组合描述的正确实例，并导航到附近主动停止。",
            "en": "A reference photograph may differ from the current object: a backpack may now be open with its side bottle removed. The robot receives a reference image and a relative modification instruction, explores an unknown indoor environment, finds the intended instance, and stops nearby."
          },
          {
            "zh": "任务要求把参考外观与修改信息共同转换成目标。变化覆盖颜色、材质、纹理、局部几何、目标状态、组件配置与上下文关系，单独的类别词或旧照片无法充分确定目标实例。",
            "en": "The reference appearance and modification must jointly define the goal. Edits cover color, material, surface pattern, part geometry, target state, component configuration, and contextual relations; a category name or outdated image alone is insufficient."
          }
        ],
        "points": [],
        "figures": [],
        "metrics": []
      },
      {
        "id": "contributions",
        "title": {
          "zh": "主要贡献",
          "en": "Main Contributions"
        },
        "paragraphs": [],
        "points": [
          {
            "zh": "定义参考图像加修正语言的组合实例导航，区分“寻找同类物体”与“找到符合当前意图的具体实例”。",
            "en": "Composed instance navigation uses a reference image plus modification text to identify the specific instance matching the current intent."
          },
          {
            "zh": "围绕七种可见变化构建参考图像、目标图像和双向修改语言，强调局部编辑和其他属性保持。",
            "en": "Reference–target image pairs and bidirectional edit instructions cover seven visible change types, with local editing and preservation of unrelated attributes."
          },
          {
            "zh": "设计免训练与学习式两类基线，分别连接视觉匹配、空间探索和策略学习。",
            "en": "Two baseline families connect visual matching and spatial exploration through either a training-free system or a learned policy."
          }
        ],
        "figures": [
          {
            "src": "assets/papers/reconav-motivation.webp",
            "caption": {
              "zh": "组合目标示例：由背包参考外观和状态/组件修改确定真实目标。",
              "en": "A backpack goal is composed from its reference appearance and edits to its state and components."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "method",
        "title": {
          "zh": "方法架构",
          "en": "Method Architecture"
        },
        "paragraphs": [
          {
            "zh": "数据构造流程先在三维场景中选择目标及可通行轨迹，由分析 VLM 判断可修改的属性并产生双向指令，再由生成模块按局部性和几何保持约束构造参考图像。",
            "en": "The data pipeline selects a target and traversable routes in a 3D scene. An analysis VLM identifies editable attributes and creates bidirectional instructions; a generation module produces the reference image under locality and geometry-preservation constraints."
          },
          {
            "zh": "免训练基线使用 CLIP 图像/文本特征与 DINOv2 局部特征进行多分支匹配，并结合局部建图、前沿探索和 FMM 规划推进导航。学习式基线将参考图像和文本特征通过 FiLM 调制，与 ResNet 观测及历史动作输入强化学习策略。",
            "en": "The training-free baseline combines CLIP image/text features and DINOv2 local features for multi-branch matching, together with local mapping, frontier exploration, and FMM planning. The learning baseline uses FiLM to condition reference-image and text features, combining them with ResNet observations and the previous action in an RL policy."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/reconav-dataset-method.webp",
            "caption": {
              "zh": "数据构造流程示意：三维场景、属性分析、局部图像编辑与双向修正语言；图中属性分数为流程示例。",
              "en": "Illustrative data pipeline: 3D scenes, attribute analysis, local image editing, and bidirectional instructions. Attribute scores illustrate the process."
            }
          },
          {
            "src": "assets/papers/reconav-trainingfree.webp",
            "caption": {
              "zh": "免训练基线：图文匹配、局部建图、前沿探索与 FMM 规划。",
              "en": "Training-free baseline: image–text matching, local mapping, frontier exploration, and FMM planning."
            }
          },
          {
            "src": "assets/papers/reconav-learning.webp",
            "caption": {
              "zh": "学习式基线：图文条件、FiLM、观测编码与强化学习策略。",
              "en": "Learning baseline: multimodal conditioning, FiLM, observation encoding, and an RL policy."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "results",
        "title": {
          "zh": "实验结果",
          "en": "Experiments and Results"
        },
        "paragraphs": [
          {
            "zh": "学习式基线按七种修改类型评估目标到达率（SR）、路径效率（SPL/SoftSPL）及目标距离误差（DTG）。总体 SR 为 27.07%，SPL 为 14.43%，SoftSPL 为 24.18%，DTG 为 5.36 m。",
            "en": "The learning baseline is evaluated over seven edit categories using success rate (SR), path efficiency (SPL/SoftSPL), and distance to goal (DTG). Overall SR is 27.07%, SPL 14.43%, SoftSPL 24.18%, and DTG 5.36 m."
          },
          {
            "zh": "不同变化类型呈现明显差异：上下文关系类 SR 为 41.86%，颜色类为 16.67%。分类结果刻画了机器人理解组合目标并区分相似实例时的难度差异。",
            "en": "Performance varies across edits: SR is 41.86% for contextual relations and 16.67% for color. The breakdown characterizes differences in the difficulty of understanding composed goals and distinguishing similar instances."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/reconav-examples.webp",
            "caption": {
              "zh": "七类参考–目标变化示例，彩色框标出对应变化区域。",
              "en": "Reference–target examples for seven edit types; boxes indicate the changed regions."
            }
          },
          {
            "src": "assets/papers/reconav-results.webp",
            "caption": {
              "zh": "原材料表格：学习式基线在七类修改任务上的结果。",
              "en": "Original source table: learning-baseline results across seven edit types."
            },
            "kind": "table",
            "displayWidth": 880
          }
        ],
        "metrics": [],
        "layout": "full"
      }
    ],
    "rankings": [
      {
        "label": {
          "zh": "CCF B",
          "en": "CCF B"
        }
      }
    ],
    "links": []
  },
  {
    "id": "bmanet",
    "title": {
      "zh": "Boundary-aware Multimodal Alignment Network for Video Temporal Grounding",
      "en": "Boundary-aware Multimodal Alignment Network for Video Temporal Grounding"
    },
    "authors": "Wendong Guo, Junyi Wang, Yanwei Zheng*, Xiao Zhang, Xingyu Zhang, Dongxiao Yu",
    "year": "",
    "venue": {
      "zh": "ACM Transactions on Multimedia Computing, Communications, and Applications",
      "en": "ACM Transactions on Multimedia Computing, Communications, and Applications"
    },
    "venueShort": {
      "zh": "ACM TOMM",
      "en": "ACM TOMM"
    },
    "image": "assets/papers/bmanet-framework.webp",
    "figureAlt": {
      "zh": "BMANet 查询增强、噪声抑制与多尺度时序金字塔框架",
      "en": "BMANet query enhancement, noise suppression, and multi-scale temporal pyramid"
    },
    "summary": {
      "zh": "面向自然语言视频时刻检索与高光检测，以查询增强、门控去噪和自适应时序金字塔改善跨模态对齐与片段边界；QVHighlights 验证集全监督平均 mAP 为54.3。",
      "en": "For language-based video temporal grounding and highlight detection, query enhancement, gated denoising, and an adaptive temporal pyramid improve alignment and boundaries; fully supervised average mAP is 54.3 on QVHighlights validation."
    },
    "sections": [
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "视频时刻检索根据自然语言查询，在未剪辑视频中找出对应片段的起止时间；高光检测为各帧预测与查询相关的显著度。两者都要求在长视频中建立准确的图文关联。",
            "en": "Moment retrieval localizes the start and end of the segment corresponding to a natural-language query in an untrimmed video. Highlight detection predicts query-related frame saliency. Both require accurate alignment between a short query and a long visual sequence."
          },
          {
            "zh": "密集视觉内容与稀疏文本之间的噪声容易造成边界过长、截断或相邻事件合并。不同事件持续时间差异明显，也要求时序表示适应多个尺度。",
            "en": "Noisy alignment between dense visual content and sparse text can overextend or truncate boundaries and merge neighboring events. Variable event durations also require temporal representations at multiple scales."
          }
        ],
        "points": [],
        "figures": [],
        "metrics": []
      },
      {
        "id": "contributions",
        "title": {
          "zh": "主要贡献",
          "en": "Main Contributions"
        },
        "paragraphs": [],
        "points": [
          {
            "zh": "设计查询增强与噪声抑制模块 QENS，用可学习 token 扩充查询语义，并以门控机制过滤与查询无关的视觉响应。",
            "en": "QENS enriches query semantics with learnable tokens and gates visual responses unrelated to the query."
          },
          {
            "zh": "设计自适应时空金字塔 ASP，结合多分辨率表示与选择性通道更新，刻画长短事件及其边界。",
            "en": "ASP combines multi-resolution representations and selective channel updates to model events of different durations and their boundaries."
          },
          {
            "zh": "统一优化时刻检索和高光检测，同时输出片段边界、置信度和帧级显著度。",
            "en": "Joint optimization supports moment retrieval and highlight detection, producing segment boundaries, confidence scores, and frame-level saliency."
          }
        ],
        "figures": [
          {
            "src": "assets/papers/bmanet-motivation.webp",
            "caption": {
              "zh": "动机：抑制跨模态噪声，并将不同时间尺度的相邻事件正确分离。",
              "en": "Motivation: suppress cross-modal noise and separate neighboring events at different temporal scales."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "method",
        "title": {
          "zh": "方法架构",
          "en": "Method Architecture"
        },
        "paragraphs": [
          {
            "zh": "首先提取并对齐视频和查询特征。QENS 通过自适应注意力和可学习 token 增强文本，再以门控层动态抑制背景响应，生成更清晰的查询相关视觉表示。",
            "en": "Video and query features are first extracted and aligned. QENS enhances textual semantics with adaptive attention and learnable tokens, then dynamically gates background responses to produce cleaner query-conditioned visual features."
          },
          {
            "zh": "ASP 逐层建立不同时间分辨率的表示，在细粒度与粗粒度分支间结合选择性特征更新。高光分支预测显著度，检索分支生成候选片段及置信度，并进一步细化时间边界。",
            "en": "ASP builds hierarchical representations at different temporal resolutions and selectively updates features across fine- and coarse-grained branches. A highlight head predicts saliency, while the retrieval head generates candidate moments and confidence estimates with temporal-boundary refinement."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/bmanet-framework.webp",
            "caption": {
              "zh": "BMANet 整体网络：QENS、ASP、时刻检索与高光检测分支。",
              "en": "BMANet architecture with QENS, ASP, moment retrieval, and highlight detection heads."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "results",
        "title": {
          "zh": "实验结果",
          "en": "Experiments and Results"
        },
        "paragraphs": [
          {
            "zh": "实验覆盖 QVHighlights、Charades-STA、TACoS、TVSum 和 Ego4D-NLQ。在 QVHighlights 验证集的全监督 InternVideo2 设置下，BMANet 达到 R1@0.5 73.6、R1@0.7 59.1 和平均 mAP 54.3；相同主干的 FlashVTG 平均 mAP 为 52.8。",
            "en": "Evaluation spans QVHighlights, Charades-STA, TACoS, TVSum, and Ego4D-NLQ. With full supervision and InternVideo2 on QVHighlights validation, BMANet reaches 73.6 R1@0.5, 59.1 R1@0.7, and 54.3 average mAP; FlashVTG with the same backbone obtains 52.8 average mAP."
          },
          {
            "zh": "在 Charades-STA 测试集上，R1@0.5 为 70.4、R1@0.7 为 49.0；在 TACoS 测试集上，分别为 40.8 和 26.0。定性示例展示了背景响应抑制、边界定位和非连续事件分离的效果。",
            "en": "On the Charades-STA test set, R1@0.5 and R1@0.7 are 70.4 and 49.0; on TACoS they are 40.8 and 26.0. Qualitative examples illustrate background suppression, boundary localization, and separation of discontinuous moments."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/bmanet-results-table.webp",
            "caption": {
              "zh": "论文原表 Table 1：QVHighlights 验证集比较，保留监督设置与主干信息。",
              "en": "Original Table 1: QVHighlights validation with supervision settings and backbones."
            },
            "kind": "table"
          },
          {
            "src": "assets/papers/bmanet-results-charades-tacos.webp",
            "caption": {
              "zh": "论文原表 Table 2：Charades-STA 与 TACoS 测试集结果。",
              "en": "Original Table 2: Charades-STA and TACoS test results."
            },
            "kind": "table"
          },
          {
            "src": "assets/papers/bmanet-results-qualitative.webp",
            "caption": {
              "zh": "时间片段及显著度曲线的定性比较，绿/蓝/橙分别对应真值、MS-DETR 和 BMANet。",
              "en": "Qualitative moment and saliency comparison: green is ground truth, blue MS-DETR, and orange BMANet."
            }
          }
        ],
        "metrics": [],
        "layout": "full"
      }
    ],
    "rankings": [
      {
        "label": {
          "zh": "CCF B",
          "en": "CCF B"
        }
      }
    ],
    "links": []
  },
  {
    "id": "uwb-following",
    "title": {
      "zh": "A Novel UWB-Based Full-Range and Multi-Angle Following Robot",
      "en": "A Novel UWB-Based Full-Range and Multi-Angle Following Robot"
    },
    "authors": "Kun Yu, Wendong Guo, Jun Yan",
    "year": "2026",
    "venue": {
      "zh": "29th International Conference on Computer Supported Cooperative Work in Design",
      "en": "29th International Conference on Computer Supported Cooperative Work in Design"
    },
    "venueShort": {
      "zh": "CSCWD 2026",
      "en": "CSCWD 2026"
    },
    "image": "assets/papers/uwb-system.webp",
    "figureAlt": {
      "zh": "UWB、双LiDAR、IMU 与 ROS 跟随机器人系统",
      "en": "Following robot integrating UWB, dual LiDAR, IMU, and ROS"
    },
    "summary": {
      "zh": "面向近距多角度跟随与远距召回，融合 UWB 引导的 LiDAR 聚类和闭环控制；实机验证0.3–0.7 m跟随与10–30 m召回，直线跟随距离标准差约4.5–4.8 cm。",
      "en": "For multi-angle following and long-range recall, UWB-guided LiDAR clustering and closed-loop control support 0.3–0.7 m following and 10–30 m recall on a real robot; straight-line distance standard deviation is about 4.5–4.8 cm."
    },
    "sections": [
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "陪护机器人既需要近距离提供辅助，也需要在保持隐私距离时快速响应召唤或跌倒事件。系统需在不同距离与方位下识别跟随目标，并协调近距跟随和远距召回。",
            "en": "An assistance robot must provide close support while also respecting a user’s preferred distance and responding to summons or falls. It needs target localization across ranges and angles, as well as coordinated close-following and distant-recall modes."
          },
          {
            "zh": "该系统围绕 0.3–0.7 m 的紧密跟随、±40° 的角度设置和 10–30 m 的远距召回进行实现与测试。",
            "en": "The implementation and evaluation cover tight following at 0.3–0.7 m, angular settings up to ±40°, and long-distance recall at 10–30 m."
          }
        ],
        "points": [],
        "figures": [],
        "metrics": []
      },
      {
        "id": "contributions",
        "title": {
          "zh": "主要贡献",
          "en": "Main Contributions"
        },
        "paragraphs": [],
        "points": [
          {
            "zh": "以 UWB 的目标身份与相对位置引导 LiDAR 点云聚类，提升近距距离估计的稳定性。",
            "en": "UWB target identity and relative position guide LiDAR clustering for stable close-range distance estimation."
          },
          {
            "zh": "支持多角度跟随，以适应人机并行、侧后方陪护等相对位置需求。",
            "en": "Multi-angle following supports different relative placements for assistance and accompaniment."
          },
          {
            "zh": "把主动召唤、跌倒触发与自动距离调整纳入 ROS 状态机，连接近距和远距模式。",
            "en": "A ROS state machine connects close and distant modes through active summons, fall-triggered recall, and automatic range adjustment."
          }
        ],
        "figures": [
          {
            "src": "assets/papers/uwb-motivation.webp",
            "caption": {
              "zh": "系统覆盖的距离范围及近距、多角度与远距召回需求。",
              "en": "Distance ranges and requirements for close following, angular placement, and long-range recall."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "method",
        "title": {
          "zh": "方法架构",
          "en": "Method Architecture"
        },
        "paragraphs": [
          {
            "zh": "近距模式先根据 UWB 测距测角定位标签，再对前方 LiDAR 点云聚类并选择与标签位置一致的目标。控制器根据距离和方位误差调节机器人运动，双 LiDAR 分别服务于目标感知和障碍检测。",
            "en": "In close mode, UWB range and bearing locate the tag. LiDAR points are clustered, and the cluster consistent with the tag position is selected. Distance and bearing errors drive closed-loop control; the two LiDARs support target sensing and obstacle detection."
          },
          {
            "zh": "远距模式通过按钮或移动端触发召回，也可由佩戴端 IMU 的跌倒阈值触发。机器人根据 UWB 定位导航至目标，结合障碍物距离调整速度；模式切换统一管理相应参数和功能。",
            "en": "Recall is triggered by a button or mobile interface, or by an IMU-based fall threshold. UWB localization guides the robot toward the target, while obstacle proximity adjusts speed. Mode transitions load the relevant parameters and behaviors."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/uwb-system.webp",
            "caption": {
              "zh": "硬件与通信架构：UWB、双 LiDAR、IMU、移动端与 ROS。",
              "en": "Hardware and communication architecture: UWB, dual LiDAR, IMU, mobile interface, and ROS."
            }
          },
          {
            "src": "assets/papers/uwb-state-machine-full.webp",
            "caption": {
              "zh": "近距跟随与远距召回的模式管理。",
              "en": "Mode management for close following and long-range recall."
            },
            "displayWidth": 740
          }
        ],
        "metrics": []
      },
      {
        "id": "results",
        "title": {
          "zh": "实验结果",
          "en": "Experiments and Results"
        },
        "paragraphs": [
          {
            "zh": "近距实验包含直线与 L 形轨迹，跟随距离设置为 0.3–0.7 m。UWB–LiDAR 方法在直线轨迹上的距离标准差为 0.045–0.048 m，在 L 形轨迹上为 0.043–0.047 m；多角度测试固定距离为 0.5 m。",
            "en": "Close-following tests use straight and L-shaped trajectories with target distances from 0.3 to 0.7 m. UWB–LiDAR distance standard deviation is 0.045–0.048 m on straight trajectories and 0.043–0.047 m on L-shaped trajectories. Multi-angle tests use a fixed 0.5 m distance."
          },
          {
            "zh": "远距召回从 10 m 到 30 m 每隔 5 m 测试，每个距离、每种触发方式各进行 20 次独立试验。按钮与跌倒触发在 10–20 m 均为 100% 成功；30 m 时分别为 80% 和 70%，平均召回时间约为 26.5 s。",
            "en": "Long-range recall is tested from 10 to 30 m in 5 m increments, with 20 independent trials per distance and trigger. Both button- and fall-triggered recall reach 100% success at 10–20 m; at 30 m they reach 80% and 70%, with mean recall time around 26.5 seconds."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/uwb-results-curves.webp",
            "caption": {
              "zh": "直线和 L 形轨迹的跟随距离比较：UWB–超声与 UWB–LiDAR。",
              "en": "Following-distance comparison on straight and L-shaped trajectories: UWB–ultrasonic versus UWB–LiDAR."
            }
          },
          {
            "src": "assets/papers/uwb-results-following-table.webp",
            "caption": {
              "zh": "论文原表 Table II：近距离跟随的距离均值与标准差。",
              "en": "Original Table II: mean distance and standard deviation in close-range following."
            },
            "kind": "table",
            "displayWidth": 660
          },
          {
            "src": "assets/papers/uwb-results-recall.webp",
            "caption": {
              "zh": "论文原表 Table III：按钮与跌倒触发的远距离召回。",
              "en": "Original Table III: long-distance recall with button and fall triggers."
            },
            "kind": "table",
            "displayWidth": 740
          }
        ],
        "metrics": [],
        "layout": "full"
      }
    ],
    "pdf": "assets/papers/pdf/uwb-following.pdf",
    "links": [
      {
        "label": "DOI",
        "url": "https://doi.org/10.1109/CSCWD68734.2026.11582511"
      }
    ],
    "rankings": [
      {
        "label": {
          "zh": "CCF C",
          "en": "CCF C"
        }
      }
    ]
  },
  {
    "id": "ddposenet",
    "title": {
      "zh": "Learning Dual-task Descriptors using Unidirectional Feature Fusion for RGB based Category-level Object Pose Estimation",
      "en": "Learning Dual-task Descriptors using Unidirectional Feature Fusion for RGB based Category-level Object Pose Estimation"
    },
    "authors": "Wendong Guo, Junyi Wang, Yanwei Zheng*, Xiao Zhang, Xingyu Zhang, Dongxiao Yu",
    "year": "",
    "venue": {
      "zh": "Neural Networks",
      "en": "Neural Networks"
    },
    "venueShort": {
      "zh": "Neural Networks",
      "en": "Neural Networks"
    },
    "image": "assets/papers/ddposenet-motivation.webp",
    "figureAlt": {
      "zh": "DDPoseNet 描述子匹配、候选位姿与置信度聚合流程",
      "en": "DDPoseNet descriptor matching, candidate poses, and confidence aggregation"
    },
    "summary": {
      "zh": "面向单张 RGB 的类别级6D位姿与尺寸估计，以双任务描述子、单向几何融合和候选置信度聚合增强预测；REAL275 NIoU50为51.4，RTX 3090上达24 FPS。",
      "en": "For RGB-only category-level 6D pose and size estimation, dual-task descriptors, one-way geometric fusion, and confidence-weighted aggregation strengthen predictions; REAL275 NIoU50 is 51.4, with 24 FPS on an RTX 3090."
    },
    "sections": [
      {
        "id": "task",
        "title": {
          "zh": "任务说明",
          "en": "Task"
        },
        "paragraphs": [
          {
            "zh": "类别级位姿估计需要从已知类别中识别未见过的物体实例，并预测其相对相机的三维位置、旋转和尺寸。只输入 RGB 图像时，模型还需克服纹理与形状差异以及尺度歧义。",
            "en": "Category-level pose estimation predicts camera-relative 3D translation, rotation, and size for unseen instances from known categories. RGB-only input makes the task difficult because of texture and shape variation and scale ambiguity."
          },
          {
            "zh": "DDPoseNet 将问题转化为图像像素与三维模型点的描述子对应，同时完成目标分割与位姿求解，避免把外部检测器作为必需前置步骤。",
            "en": "DDPoseNet formulates the task as descriptor correspondences between image pixels and 3D model points. Segmentation and pose estimation are learned together without requiring an external detector as a prerequisite."
          }
        ],
        "points": [],
        "figures": [],
        "metrics": []
      },
      {
        "id": "contributions",
        "title": {
          "zh": "主要贡献",
          "en": "Main Contributions"
        },
        "paragraphs": [],
        "points": [
          {
            "zh": "学习同时支持像素分割和 2D–3D 对应的双任务描述子，在同一框架内求解位姿与真实尺度。",
            "en": "Dual-task descriptors support both pixel segmentation and 2D–3D correspondence, enabling pose and metric-scale recovery in one framework."
          },
          {
            "zh": "采用单向特征融合，让三维几何信息增强图像描述子，同时保持模型分支可独立预计算。",
            "en": "One-way feature fusion enriches image descriptors with 3D geometry while keeping the model branch independently precomputable."
          },
          {
            "zh": "预测不同候选模型的位姿置信度，再加权聚合多个候选，减小模型选择带来的不确定性。",
            "en": "Predicted confidence scores weight and aggregate poses from different model candidates to reduce model-selection uncertainty."
          }
        ],
        "figures": [
          {
            "src": "assets/papers/ddposenet-motivation.webp",
            "caption": {
              "zh": "整体思路：描述子对应产生初始位姿，候选置信度得到最终估计。",
              "en": "Descriptors produce initial pose hypotheses, followed by confidence-based final estimation."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "method",
        "title": {
          "zh": "方法架构",
          "en": "Method Architecture"
        },
        "paragraphs": [
          {
            "zh": "图像分支采用 Swin Transformer，点云分支采用 Point Transformer V3，辅以冻结 DINOv2 的几何特征。单向融合模块用几何分支指导图像特征，网络同时学习描述子相似性、距离关系与分割目标。",
            "en": "A Swin Transformer encodes images and Point Transformer V3 encodes model points, with frozen DINOv2 features providing auxiliary geometric cues. One-way fusion guides the image branch with geometry, while training combines descriptor similarity, distance relations, and segmentation objectives."
          },
          {
            "zh": "推理时先进行像素和模型描述子匹配，建立 2D–3D 对应并通过 PnP 生成候选位姿。对于同类多个实例，根据对应点的位姿一致性区分目标，最后以置信度加权融合候选。",
            "en": "At inference, pixel and model descriptors establish 2D–3D correspondences and PnP produces pose hypotheses. Pose consistency among correspondences helps distinguish multiple same-category instances, after which confidence-weighted aggregation gives the final pose."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/ddposenet-method.webp",
            "caption": {
              "zh": "DDPoseNet 网络：图像/点云编码器、描述子解码器和单向特征融合。",
              "en": "DDPoseNet image/point encoders, descriptor decoders, and one-way feature fusion."
            }
          }
        ],
        "metrics": []
      },
      {
        "id": "results",
        "title": {
          "zh": "实验结果",
          "en": "Experiments and Results"
        },
        "paragraphs": [
          {
            "zh": "类别级实验在 REAL275 与 CAMERA25 上进行。使用三维模型的 REAL275 结果为 NIoU50 51.4、NIoU75 27.3、IoU50 22.4；不用真值三维模型、以训练样本重建模型的设置仍取得 NIoU50 51.1。",
            "en": "Category-level evaluation uses REAL275 and CAMERA25. With 3D models on REAL275, NIoU50 is 51.4, NIoU75 27.3, and IoU50 22.4. Replacing ground-truth models with reconstructions from training samples still obtains 51.1 NIoU50."
          },
          {
            "zh": "实例级 YCB-Video 测试达到 ADD(-S) 86.1、ADD-S AUC 93.3 和 ADD(-S) AUC 89.4。单向融合、位姿置信度和双任务描述子均通过消融验证；在 RTX 3090 上，REAL275/CAMERA25 推理速度为 24 FPS。",
            "en": "On the instance-level YCB-Video benchmark, ADD(-S) is 86.1, ADD-S AUC 93.3, and ADD(-S) AUC 89.4. Ablations evaluate one-way fusion, pose confidence, and dual-task descriptors. Inference on REAL275/CAMERA25 runs at 24 FPS on an RTX 3090."
          }
        ],
        "points": [],
        "figures": [
          {
            "src": "assets/papers/ddposenet-results-category.webp",
            "caption": {
              "zh": "论文原表 Table 1：REAL275 与 CAMERA25 类别级位姿和尺寸估计。",
              "en": "Original Table 1: category-level pose and size estimation on REAL275 and CAMERA25."
            },
            "kind": "table"
          },
          {
            "src": "assets/papers/ddposenet-results-instance.webp",
            "caption": {
              "zh": "论文原表 Table 2：YCB-Video 实例级位姿估计结果。",
              "en": "Original Table 2: instance-level pose results on YCB-Video."
            },
            "kind": "table",
            "displayWidth": 740
          },
          {
            "src": "assets/papers/ddposenet-results-qualitative.webp",
            "caption": {
              "zh": "REAL275 与 YCB-Video 可视化，绿色为真值框、蓝色为预测框。",
              "en": "Qualitative REAL275 and YCB-Video results: green boxes are ground truth and blue boxes are predictions."
            }
          }
        ],
        "metrics": [],
        "layout": "full"
      }
    ],
    "rankings": [
      {
        "label": {
          "zh": "CCF B",
          "en": "CCF B"
        }
      }
    ],
    "links": []
  }
];
