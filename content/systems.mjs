// Intelligent-system projects from the supplied reports and design documents.
const b = (zh, en) => ({ zh, en });
const figure = (src, zh, en, extra = {}) => ({ src, caption: b(zh, en), ...extra });
const technique = (zh, en, descriptionZh, descriptionEn) => ({ name: b(zh, en), description: b(descriptionZh, descriptionEn) });

export const intelligentSystems = [
  {
    id: 'thermal-safety',
    group: 'systems',
    categoryKey: 'systems',
    category: b('工业视觉 · 安全识别', 'Industrial vision · Safety monitoring'),
    organization: b('华电莱州电厂', 'Huadian Laizhou Power Plant'),
    title: b('火力发电智能识别预警系统', 'Intelligent visual inspection and safety warning for thermal power plants'),
    summary: b('面向电厂设备与作业安全识别，以 YOLO 多类别检测和人脸识别构建验证系统，完成现场样本训练与离线演示。', 'For power-plant safety inspection, YOLO detection and face recognition support a validation system with site-specific training and offline demonstrations.'),
    facts: [
      { label: b('本人职责', 'Role'), value: b('算法研发、场景数据集构建与演示系统集成', 'Algorithm development, site-specific data preparation, and demo integration') },
      { label: b('验证阶段', 'Validation stage'), value: b('检测模型与图片级 Web 演示', 'Detection models and an image-based Web demonstrator') }
    ],
    media: { video: 'assets/projects/thermal-safety/detection.mp4', poster: 'assets/projects/thermal-safety/poster.webp', alt: b('电厂安全标识与设备的离线目标检测演示', 'Offline detection of power-plant safety signs and equipment') },
    sections: [
      {
        id: 'background', title: b('项目背景', 'Background'),
        paragraphs: [b('火力发电现场包含电气设备、转动机械、高处作业和消防设施等多类对象。设备遮挡、光照变化与远距离小目标，使人工巡查和通用视觉模型都难以稳定覆盖现场风险。项目面向华电莱州电厂的安全生产需求，探索从现场图像中识别设备、防护用品及典型不安全状态，为辅助检查和事件追溯提供结构化信息。', 'Thermal power plants contain electrical equipment, rotating machinery, elevated work areas, and fire-safety facilities. Occlusion, changing illumination, and small distant objects challenge both manual inspection and general-purpose vision models. The project addresses Huadian Laizhou Power Plant’s safety needs by recognizing equipment, protective gear, and potentially unsafe conditions in site imagery. Structured outputs support inspection and event review.')]
      },
      {
        id: 'task', title: b('任务说明', 'Task'),
        paragraphs: [b('输入现场采集的设备、作业人员和安全设施图像，输出目标位置、类别和置信度，辅助检查安全设备配置及人员防护情况；人脸比对模块用于探索事件与人员身份的关联。算法研发同时覆盖数据抽帧、标注校验、多类别训练和演示界面集成。', 'Given site images of equipment, workers, and safety facilities, predict object locations, categories, and confidence scores to assist equipment and protective-gear checks. A face-matching module explores identity association for events. Development covers frame sampling, annotation review, multi-class training, and demo integration.')],
        points: [
          b('数据覆盖电气设备、热机设备、消防与标识、工器具、防护用品及典型违章场景，重点处理少样本类别与复杂背景。', 'Data cover electrical and mechanical equipment, fire-safety signs, tools, protective gear, and representative unsafe conditions, with attention to rare classes and complex backgrounds.'),
          b('当前已完成图片级检测与身份比对演示；连续视频告警、跨帧行为判断和全天候在线预警属于后续完善方向。', 'The current demonstrator supports image-based detection and identity matching. Continuous video alerts, temporal behavior reasoning, and round-the-clock monitoring remain further development tasks.')
        ]
      },
      {
        id: 'system', title: b('系统和关键技术', 'System and key technologies'),
        paragraphs: [b('以场景数据和检测模型为主线，将数据准备、算法训练、推理输出与 Web 展示连接起来。以下流程图按项目介绍中的实际技术链路整理。', 'The workflow connects site-specific data preparation, model training, inference, and Web presentation. The diagram summarizes the technical pipeline described in the project report.')],
        techniques: [
          technique('YOLOv11 多类别检测', 'YOLOv11 multi-class detection', '加载预训练权重，针对电厂图像进行多类别联合训练与参数调整，输出设备、人员及安全标识的检测框、类别与置信度；项目材料记录了 200 余类目标的训练工作。', 'Fine-tune pretrained weights on power-plant images with multi-class training and parameter adjustment. Outputs include bounding boxes, classes, and confidence for equipment, people, and safety signs. The report documents training on more than 200 target classes.'),
          technique('YOLO / SAM 辅助标注', 'YOLO / SAM-assisted annotation', '从原始视频抽帧并过滤冗余画面，以预标注、分割辅助和人工复核构建场景数据。针对稀缺违章类别补充合成样本，并注意合成数据与真实工况之间的域差异。', 'Sample and deduplicate source frames, then combine pre-annotation, segmentation assistance, and manual review. Synthetic examples supplement scarce unsafe-condition classes, while domain differences from real site imagery are considered.'),
          technique('人脸比对与 Flask 集成', 'Face matching and Flask integration', '将人脸识别与图片上传、推理结果展示集成到 Web 演示系统，探索从视觉识别结果到人员事件追溯的连接。安全帽、口罩和面部遮挡仍会影响身份绑定。', 'Integrate face matching, image upload, and prediction visualization into a Flask-based demonstrator, connecting visual events with identity lookup. Helmets, masks, and facial occlusion remain limitations for identity association.')
        ],
        figures: [figure('assets/projects/thermal-safety/pipeline.svg', '现场数据、检测模型与图片级 Web 演示的技术流程', 'Pipeline from site data to detection and image-based Web demonstration', { displayWidth: 1000 })]
      },
      {
        id: 'demo', title: b('演示与结果', 'Demonstrations and results'),
        paragraphs: [b('演示视频展示安全出口标识、发电设备及现场工具等对象的检测结果，属于离线算法验证。下方原始采集样本展示模型面对的真实场景与缺陷类型，未叠加检测结果。', 'The video shows offline detection of exit signs, generation equipment, and site tools. The original samples below illustrate the operating environments and defect types; they do not contain prediction overlays.')],
        figures: [
          { video: 'assets/projects/thermal-safety/detection.mp4', poster: 'assets/projects/thermal-safety/poster.webp', caption: b('安全标识与设备识别：现场素材离线演示', 'Safety-sign and equipment detection on recorded site material'), layout: 'full' },
          figure('assets/projects/thermal-safety/transformer.webp', '现场样本：电气设备与变压器', 'Site sample: electrical equipment and transformer', { row: 'equipment-samples' }),
          figure('assets/projects/thermal-safety/machine-guard.webp', '现场样本：转动设备防护罩', 'Site sample: rotating-equipment guard', { row: 'equipment-samples' }),
          figure('assets/projects/thermal-safety/uncovered-trench.webp', '缺陷样本：坑沟盖板缺失', 'Defect sample: an uncovered trench', { row: 'defect-samples' }),
          figure('assets/projects/thermal-safety/corrosion.webp', '缺陷样本：管道与设备锈蚀', 'Defect sample: pipe and equipment corrosion', { row: 'defect-samples' })
        ]
      },
      {
        id: 'results', title: b('验证情况', 'Validation'),
        paragraphs: [b('项目介绍记录：灭火器检测在对应验证集上的 mAP@50 为 0.995。该结果仅针对这一类别和验证集，不代表所有违章类别的总体识别率。项目完成了现场数据采集、检测模型训练及图片级演示链路验证；小目标漏检、类别不均衡、跨摄像头泛化和时序误报仍是后续优化重点。', 'The project report records an mAP@50 of 0.995 for fire-extinguisher detection on its corresponding validation set. This is a class- and dataset-specific result, rather than an overall unsafe-behavior recognition rate. Validation covers data collection, detector training, and an image-based demonstration pipeline. Remaining challenges include small objects, class imbalance, cross-camera generalization, and temporal false alarms.')]
      }
    ]
  },
  {
    id: 'personnel-tracking', group: 'systems', categoryKey: 'systems',
    category: b('多模态感知 · 人员定位', 'Multimodal perception · Personnel localization'),
    organization: b('南瑞', 'NARI'),
    title: b('人员识别定位与轨迹回放系统', 'Personnel identification, localization, and trajectory playback'),
    summary: b('面向人员身份与位置追踪，融合视频检测、重识别与雷达定位，实现同步监控、轨迹回放，并完成双路相机试运行。', 'For identity and location tracking, video detection, re-identification, and radar localization enable synchronized monitoring and trajectory playback, with two-camera trial operation.'),
    facts: [
      { label: b('部署形式', 'Deployment'), value: b('单机多 GPU · 浏览器访问', 'Single-server multi-GPU system with browser access') },
      { label: b('运行记录', 'Operation snapshot'), value: b('2026.10 汇报记录：2 路相机在线试运行', 'October 2026 report: two cameras online in trial operation') }
    ],
    media: { video: 'assets/projects/personnel-tracking/fusion.mp4', poster: 'assets/projects/personnel-tracking/poster.webp', alt: b('同步相机检测与全局融合轨迹演示', 'Synchronized camera detections and global fused trajectories') },
    sections: [
      {
        id: 'background', title: b('项目背景', 'Background'),
        paragraphs: [b('园区与厂区的视频监控通常只能提供分散的画面，难以持续回答“有哪些人员、位于何处、如何移动”。本系统将视频中的检测与身份信息同雷达空间定位结合，在统一 Web 平台中呈现实时人员轨迹与历史记录，连接现场观察、身份查询和轨迹回溯。', 'Separate surveillance feeds make it difficult to determine who is present, where each person is, and how they moved. This system combines visual detection and identity cues with radar-based spatial localization. A unified Web platform connects live observation, identity lookup, and historical trajectory review.')]
      },
      {
        id: 'task', title: b('任务说明', 'Task'),
        paragraphs: [b('接入多路网络相机、雷达点云和标定参数，完成检测跟踪、身份确认、世界坐标定位与轨迹存储。前端同步展示视频框与轨迹，支持实时监控、历史回放、人员档案和多视角 ReID 图片维护；实时链路还需避免旧检测框叠加到新画面、后处理积压和服务异常中断。', 'Ingest network cameras, radar point clouds, and calibration parameters; detect and track people, confirm identity, estimate world coordinates, and store trajectories. The frontend synchronizes video overlays with trajectories and supports live monitoring, playback, personnel records, and multi-view ReID galleries. The real-time pipeline must prevent stale overlays, processing backlogs, and service interruptions.')]
      },
      {
        id: 'system', title: b('系统和关键技术', 'System and key technologies'),
        paragraphs: [b('系统采用前后端分离架构，算法服务与独立视频流服务分工协作，数据层保存人员档案、检测记录与事件。身份图的跨相机关联扩展按受控测试启用，日常运行以报告中已开启的功能为准。', 'The architecture separates frontend and backend responsibilities, and runs algorithm and video-stream services independently. The data layer stores personnel records, detections, and events. Extended cross-camera identity-graph association is enabled for controlled tests; normal operation uses the functions documented as active in the report.')],
        techniques: [
          technique('YOLO + ByteTrack', 'YOLO + ByteTrack', '对相机帧进行人员检测与多目标跟踪。解码、检测、跟踪和叠加发布在每相机关键链路中顺序完成，避免重型后处理阻塞视频更新。', 'Detect people and maintain multi-object tracks. Decoding, detection, tracking, and overlay publication run sequentially in each camera’s critical path, isolated from expensive post-processing.'),
          technique('InsightFace / FastReID / 步态证据', 'InsightFace / FastReID / gait cues', '以人脸锚点优先确认身份，ReID 和步态作为辅助证据；通过置信度差距与连续帧确认约束身份切换，降低身份抖动。', 'Prioritize face anchors for identity confirmation, with ReID and gait as supporting cues. Confidence margins and confirmation across successive frames constrain identity changes.'),
          technique('源帧对齐与雷达融合', 'Source-frame alignment and radar fusion', '以相机源时间戳贯穿解码、检测、雷达匹配及前端叠加；雷达点云按 0.1 秒时间窗匹配视频，完成投影、背景剔除和世界坐标输出。', 'Carry camera source timestamps through decoding, detection, radar matching, and overlays. Match radar points to video within a 0.1-second window, project points, remove background, and output world coordinates.'),
          technique('有界队列与独立流服务', 'Bounded queues and independent streaming', '将融合、轨迹维护与落盘放入每相机容量为 2 的后处理队列，满时保留新任务；视频流按源时间同步播放，仅使用精确同帧结果或安全插值叠加。', 'Place fusion, trajectory maintenance, and persistence in per-camera post-processing queues of capacity two, retaining recent tasks when full. Streaming follows source time and overlays only exact-frame results or safe interpolation.'),
          technique('Vue 3 + FastAPI + MySQL', 'Vue 3 + FastAPI + MySQL', '以 Vue 3 / Element Plus 构建 Web 界面，FastAPI 提供算法与业务接口，MySQL 保存结构化记录；Nginx 统一入口，WebSocket 更新轨迹元数据，多 GPU 复用检测与身份服务。', 'Build the Web interface with Vue 3 and Element Plus, serve algorithm and business APIs through FastAPI, and persist records in MySQL. Nginx provides a unified entry point, WebSocket updates trajectory metadata, and multiple GPUs share detection and identity workloads.')
        ],
        layout: 'full',
        figures: [
          figure('assets/projects/personnel-tracking/architecture.webp', '总体架构：相机与雷达接入、实时识别、轨迹服务和 Web 展示', 'Architecture: camera/radar ingestion, recognition, trajectory services, and Web presentation', { displayWidth: 1080 }),
          figure('assets/projects/personnel-tracking/realtime-flow.webp', '实时处理：源帧对齐、关键链路与后处理隔离', 'Real-time pipeline: source-frame alignment and isolated post-processing', { displayWidth: 1080 })
        ]
      },
      {
        id: 'deployment', title: b('部署与工程实现', 'Deployment and engineering'),
        paragraphs: [b('汇报中的运行环境为单机服务器，配备 4 张 NVIDIA RTX 3090；相机输入采用 H.264 视频，雷达输出点云，标定文件维护传感器间坐标关系。视频流、算法服务和统一入口分别运行，启动流程包含健康检查与资源调优；无可用 GPU 时支持 CPU 回退。', 'The reported deployment uses a single server with four NVIDIA RTX 3090 GPUs, H.264 camera feeds, radar point clouds, and calibration files for sensor coordinate transforms. Streaming, algorithm services, and the unified entry point run separately. Startup includes health checks and resource tuning, with CPU fallback when a GPU is unavailable.')],
        points: [
          b('看门狗区分人工停止、服务挂起与进程退出，按状态恢复；慢客户端和消息大小使用有界保护。', 'A watchdog distinguishes manual stops, hung services, and terminated processes; bounded protections limit slow clients and oversized messages.'),
          b('每次监控启停建立独立后处理会话，旧任务在产生副作用前校验会话，避免历史结果污染新一轮监控。', 'Each monitoring session has its own post-processing state. Old tasks validate their session before side effects, preventing stale results from entering a new session.')
        ]
      },
      {
        id: 'demo', title: b('演示与结果', 'Demonstrations and results'),
        paragraphs: [b('视频展示多路相机中的人员检测与同一全局坐标视图中的轨迹更新。2026 年 10 月 19 日汇报记录为：配置 5 路相机，其中 2 路在线试运行，累计检测记录 10,863 条；预览与处理循环配置为 30 FPS。该运行记录不等同于识别准确率或定位误差的专项测试结果。', 'The recording shows person detections from multiple cameras alongside trajectory updates in a shared coordinate view. The report dated October 19, 2026 records five configured cameras, two online in trial operation, and 10,863 accumulated detection records, with preview and processing loops configured at 30 FPS. These operation figures do not constitute dedicated recognition-accuracy or localization-error measurements.')],
        figures: [{ video: 'assets/projects/personnel-tracking/fusion.mp4', poster: 'assets/projects/personnel-tracking/poster.webp', caption: b('同步相机检测与全局轨迹更新', 'Synchronized camera detections and global trajectory updates'), displayWidth: 1000, layout: 'full' }]
      }
    ]
  },
  {
    id: 'tender-analysis', group: 'systems', categoryKey: 'systems',
    category: b('文档智能 · 系统设计', 'Document intelligence · System design'),
    year: '2024', organization: b('山东电网', 'State Grid Shandong'),
    title: b('投标文件识别系统', 'Bid document recognition and analysis system'),
    summary: b('面向投标文件审阅，设计 OCR 与语义分析流程，涵盖结构化解读、内容归类、疑似异常核查及原文定位。', 'For bid-document review, an OCR and semantic-analysis workflow is designed for structured interpretation, classification, potential-anomaly review, and source-page navigation.'),
    facts: [{ label: b('工作内容', 'Scope'), value: b('需求分析、系统设计与界面原型', 'Requirements, system design, and interface prototypes') }],
    media: { image: 'assets/projects/tender-analysis/architecture.webp', alt: b('投标文件识别系统的分层架构设计', 'Layered architecture of the bid-document recognition system') },
    sections: [
      {
        id: 'background', title: b('项目背景', 'Background'),
        paragraphs: [b('投标文件通常篇幅长、版式复杂，正文中混排表格、资质材料、合同与签名。人工在多个文件之间查找信息、比对内容和核对页码，容易出现遗漏。该项目围绕文件上传、结构化解析、内容分类和辅助核查，设计统一的文档审阅工作流。', 'Bid documents are lengthy and mix prose with tables, qualifications, contracts, and signatures. Manually searching, comparing, and checking page references across documents is time-consuming and prone to omissions. The project designs a unified review workflow for upload, structured parsing, classification, and assisted inspection.')]
      },
      {
        id: 'task', title: b('任务说明', 'Task'),
        paragraphs: [b('以 PDF 或扫描文件为输入，按项目与标书组织资料，提取文本、表格及图片，生成可定位到原页的目录和内容解读；在此基础上提供分类归档、相似片段、签名一致性及疑似图像修改等分析入口。输出用于辅助人工复核，不能以相似度或模型分数直接认定违规。', 'Accept PDF or scanned inputs, organize files by project and bid, extract text, tables, and images, and provide a table of contents and interpretations linked to source pages. Analysis views cover categorization, similar passages, signature consistency, and possible image edits. Outputs assist human review; similarity or model scores alone do not establish misconduct.')],
        points: [
          b('原文与分析结果并列展示，目录、表格和异常线索保留页码跳转，便于核验识别内容。', 'Display source pages beside analysis, with page links for headings, tables, and flagged items so results can be checked against the original.'),
          b('所提供材料为需求、概要设计、详细设计及界面原型，以下展示系统设计内容，不列未经测试的识别率或效率提升。', 'The supplied materials comprise requirements, high-level and detailed designs, and interface prototypes. The following presents those designs without unmeasured accuracy or efficiency claims.')
        ]
      },
      {
        id: 'system', title: b('系统和关键技术', 'System and key technologies'),
        paragraphs: [b('设计采用用户交互层、服务层和基础设施层。WebService 负责文件、任务和业务接口，算法服务独立执行 OCR 与语义分析；数据库保存项目元数据和分析结果，文件存储保存原始文档与派生资源。Vue 页面和 REST API 提供交互与集成入口。', 'The design separates user interaction, services, and infrastructure. WebService manages files, tasks, and business interfaces; algorithm services handle OCR and semantic analysis. A database stores project metadata and analysis results, while file storage retains originals and derived resources. Vue pages and REST APIs provide user and integration interfaces.')],
        techniques: [
          technique('PDF 解析与 OCR', 'PDF parsing and OCR', '方案使用 PyPDF2 / PyMuPDF 提取可读取文本与内嵌图片，对扫描页进行预处理与 Tesseract OCR；页码与区域位置贯穿后续解析，支持原文追溯。', 'The design uses PyPDF2 / PyMuPDF for readable text and embedded images, and preprocessing with Tesseract OCR for scanned pages. Page numbers and region coordinates remain associated with extracted content.'),
          technique('BERT / DistilBERT / T5', 'BERT / DistilBERT / T5', '根据标题格式与语义组织章节层级，以文本分类归并合同、财务、资质等内容，再对已提取文本生成章节解读；这些模型作为设计选型描述。', 'Use heading format and semantics to organize sections, classify extracted text into contracts, financial content, qualifications, and related groups, then generate section interpretations. These models are described as design choices.'),
          technique('表格结构与图文索引', 'Table structure and visual indexing', '设计以 TableNet 定位表格区域，结合 OCR 提取单元格文本；图片与表格均保留所属页和上下文，便于原文查看和结构化归档。', 'The design uses TableNet to locate tables and OCR to extract cell text. Images and tables retain their source page and surrounding context for inspection and structured archiving.'),
          technique('语义相似与实体关系', 'Semantic similarity and entity relations', '以 Sentence-BERT 语义表示比较同类文本，结合命名实体识别组织人员、单位和项目关系；分析结果作为检索与人工核查线索。', 'Use Sentence-BERT representations to compare related texts and named-entity recognition to organize people, organizations, and projects. Results serve retrieval and human review.'),
          technique('任务分发与结果复用', 'Task dispatch and result reuse', '请求先校验参数并查询已有分析结果，未命中时才调用对应算法服务；结果写入数据库后返回前端，减少同一文件的重复分析，并保持业务与算法模块解耦。', 'Validate requests and look up existing analysis before invoking an algorithm service on a cache miss. Persist and return results, reducing repeated analysis and decoupling business logic from algorithms.')
        ],
        layout: 'full',
        figures: [
          figure('assets/projects/tender-analysis/architecture.webp', '总体设计：交互、WebService、算法服务与基础设施', 'Architecture design: interface, WebService, algorithm services, and infrastructure', { displayWidth: 900 }),
          figure('assets/projects/tender-analysis/analysis-sequence.webp', '内容解读时序：结果查询、算法调用与持久化', 'Interpretation sequence: result lookup, algorithm execution, and persistence', { displayWidth: 620 })
        ]
      },
      {
        id: 'demo', title: b('界面原型与交互设计', 'Interface prototype and interaction design'),
        paragraphs: [b('原型将项目文件夹、标书列表与文档分析页串联。上传入口支持选择或拖入 PDF，分析页采用原文和解读并列的双栏布局；识别文字可人工更正，目录和线索可跳转到对应页。以下为原设计中的上传对话框。', 'The prototype links project folders, bid lists, and document analysis. PDF upload accepts file selection or drag-and-drop. The analysis page places the original document beside interpretations, with editable OCR text and source-page links. The figure shows the upload dialog from the original design.')],
        figures: [figure('assets/projects/tender-analysis/upload-prototype.webp', '文件上传对话框：选择文件与拖拽交互原型', 'Upload-dialog prototype with file selection and drag-and-drop', { displayWidth: 660 })]
      }
    ]
  }
];
