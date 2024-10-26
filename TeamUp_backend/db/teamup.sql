-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: teamup
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `award`
--

DROP TABLE IF EXISTS `award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `award` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `prize` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `proof` varchar(200) NOT NULL,
  `is_delete` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `award_sys_user_id_fk` (`user_id`),
  CONSTRAINT `award_sys_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `link` varchar(150) NOT NULL,
  `month` int NOT NULL,
  `description` longtext NOT NULL,
  `is_delete` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (1,'高教社杯全国大学生数学建模竞赛','https://www.mcm.edu.cn/',9,'高教社杯全国大学生数学建模竞赛创办于1992年，每年一届，是首批列入“高校学科竞赛排行榜”的19项竞赛之一。',1),(2,'美国大学生数学建模竞赛','https://www.comap.com/',2,'美国大学生数学建模竞赛（MCM/ICM），简称“美赛”，由美国数学及其应用联合会主办，是最高的国际性数学建模竞赛，也是世界范围内最具影响力的数学建模竞赛，一般也指数学建模竞赛。赛题内容涉及经济、管理、环境、资源、生态、医学、安全、等众多领域。竞赛要求三人（本科生和研究生均可参加）为一组，在四天时间内，就指定的问题完成从建立模型、求解、验证到论文撰写的全部工作，体现了参赛选手研究问题、解决方案的能力及团队合作精神。 为现今各类数学建模竞赛之鼻祖。',1),(3,'APMCM亚太地区大学生数学建模竞赛','https://www.saikr.com/vse/apmcm/2024',11,'目前亚太地区大学生数学建模竞赛具有较高的国际影响力，在国内高校中是作为美赛热身赛、保研加分、综合测评加分、创新奖学金等评定竞赛之一。',1),(4,'高教社杯全国大学生数学竞赛','https://www.mcm.edu.cn/',9,'该竞赛创办于1992年，每年一届，是首批列入“高校学科竞赛排行榜”的19项竞赛之一。2024年，来自全国及美国、英国、澳大利亚、新加坡、马来西亚的1788所院校/校区、65761队(本科59278队、专科6483队)、近20万人报名参赛。',0),(5,'美赛','https://www.comap.com/',2,'美国大学生数学建模竞赛（MCM/ICM），简称“美赛”，由美国数学及其应用联合会主办，是最高的国际性数学建模竞赛，也是世界范围内最具影响力的数学建模竞赛，一般也指数学建模竞赛。赛题内容涉及经济、管理、环境、资源、生态、医学、安全、等众多领域。',1),(6,'CCF开源创新大赛','https://www.gitlink.org.cn/competitions/2024?login=&websiteName=educoder',7,'CCF开源创新大赛一般分为四个赛道：开源项目贡献赛道、开源任务挑战赛道、开源案例教学赛道和开源代码评注赛道，每个赛道下又分多个子赛道。其聚焦“卡脖子”软件领域以及人工智能、大数据、芯片设计、物联网等前沿技术领域的开源软件，旨在为国内开源社区提供展示、交流、合作的平台，激发开源创新活力，培养开源实践人才，助力开源生态建设的高质量发展。',0),(7,'蓝桥杯','https://dasai.lanqiao.cn/',4,'蓝桥杯全国软件和信息技术专业人才大赛是由中华人民共和国工业和信息化部人才交流中心主办，国信蓝桥教育科技（北京）股份有限公司承办的计算机类学科竞赛。',1),(8,'全国大学生统计建模大赛','http://tjjmds.ai-learning.net/',5,'全国大学生统计建模大赛是一项旨在提升大学生统计分析和数据挖掘能力的全国性学科竞赛，通过团队合作解决实际问题，培养学生的创新思维和实践技能，比赛通常分为初赛和决赛，设有多个奖项以鼓励优秀表现，已成为高校教育中培养学生综合素质的重要平台。',0),(9,'大湾区杯”粤港澳金融数学建模竞赛 ','https://www.tipdm.org:10010/#/competition/1794997857259003904/introduce',10,'\"大湾区杯\"粤港澳金融数学建模竞赛是一项旨在推动数学建模方法在金融领域的创新研究，促进数字金融、数字货币和智能金融与传统金融投资领域的融合发展的竞赛。它鼓励数学和金融领域的交叉渗透和原始创新，培养、挖掘金融科技方向的具有国际视野的量化投资创新人才。',0),(10,'APMCM亚太地区大学生数学建模竞赛','https://www.saikr.com/vse/apmcm/2024',11,'APMCM旨在普及数学建模知识，锻炼大学生的逻辑思维能力，提高学生建立数学模型和运用计算机技术解决多行业复杂问题的能力。竞赛时间为4天，参赛对象为全日制在校大学生，每队由2-3名学生组成。竞赛的试题及材料均为英文，要求学生答题也应为英文书写。APMCM是美国大学生数学建模竞赛之后，又一国际性数学建模赛事，也是美国大学生数学建模竞赛开赛前的一个大型赛事。',0),(11,'中国国际“互联网+”大学生创新创业大赛','https://cy.ncss.cn/index.html',6,'中国国际“互联网+”大学生创新创业大赛由教育部等部门主办，是认可度最高的大学生综合性竞赛之一，涉及多个创业阶段和项目特点的组别，强调技术创新性和商业化潜力。',0),(12,'全国大学生数学竞赛','http://www.mcm.edu.cn/',10,'全国大学生数学竞赛由中国数学会主办，面向全国大学生的数学竞赛，旨在提高学生的数学素养和解决问题的能力。',0),(13,'蓝桥杯','https://dasai.lanqiao.cn/',4,'蓝桥杯大赛旨在促进软件和信息领域专业技术人才培养，提升高校毕业生的就业竞争力。大赛每年一届，吸引了包括北京大学、清华大学、复旦大学、上海交通大学、中国科学技术大学等在内的高校参与。蓝桥杯大赛连续五年入选中国高等教育学会“全国普通高校学科竞赛排行榜”，是高校教育教学改革和创新人才培养的重要竞赛项目。',0);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_tag`
--

DROP TABLE IF EXISTS `match_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `match_id` int NOT NULL,
  `tag` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `match_tag_match_id_fk` (`match_id`),
  CONSTRAINT `match_tag_match_id_fk` FOREIGN KEY (`match_id`) REFERENCES `match` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_tag`
--

LOCK TABLES `match_tag` WRITE;
/*!40000 ALTER TABLE `match_tag` DISABLE KEYS */;
INSERT INTO `match_tag` VALUES (1,1,'数学建模'),(2,2,'数学建模'),(3,3,'数学建模'),(4,4,'数学建模'),(5,5,'数学建模'),(6,5,'全球性比赛'),(7,6,'开源创新'),(8,6,'团队竞赛'),(9,7,'计算机科学与技术'),(10,8,'数学建模'),(11,8,'开放性试题'),(12,9,'数学建模'),(13,10,'数学建模'),(14,11,'创新创业'),(15,11,'互联网'),(16,12,'数学竞赛'),(17,13,'编程竞赛'),(18,13,'全国性赛事');
/*!40000 ALTER TABLE `match_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(200) CHARACTER SET utf8mb3 NOT NULL,
  `type` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `like_count` int NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  `is_delete` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `post_sys_user_id_fk` (`user_id`),
  CONSTRAINT `post_sys_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,11,'测试帖子-01',0,'这里是测试帖子-01的内容',1,'2024-10-21 13:32:37',1),(2,11,'测试帖子-02',0,'这里是测试帖子-02的内容',0,'2024-10-21 13:33:30',1),(4,11,'【CCF开源创新大赛国二】经验贴',1,'<h3>笔者介绍</h3><p>2023年CCF开源创新大赛OpenGauss项目贡献赛道国家级二等奖获得者</p><h3>经验</h3><p>1. 找好队友，分工明确</p><p>2. 选择合适自己的赛道（比如竞争少的赛道</p>',1,'2024-10-21 19:07:21',1),(5,11,'2025年计算机设计大赛队友招募',0,'<h3>笔者背景介绍</h3><p>曾获得2024年计算机设计大赛大数据实践赛道国三和数据可视化赛道省一</p><h3>招募要求</h3><p>1. 美工（1人）</p><p>2. 文书（1人）</p>',1,'2024-10-21 23:33:55',1),(6,11,'有关大学生参加学术竞赛以及推免的一些经验分享【转载】',1,'<p> <a href=\"https://zhuanlan.zhihu.com/p/117659511\" target=\"_blank\">【原文来源】</a> </p><h3 style=\"text-align: start;\"><strong>一、介绍自己</strong></h3><p style=\"text-align: start;\">自己大学四年过的比较充实，参加社团，参加比赛，整天基本上忙忙碌碌的。但是在大学中也收获了很多。在校期间曾获得多个校级、省级荣誉称号以及多次奖学金。</p><p style=\"text-align: start;\">在大学期间，自己曾获得国家级奖励5项、省级奖励8项、校级奖励40余项。其中省级及以上的奖励主要归因于科技创新类的竞赛。</p><h3 style=\"text-align: start;\"><strong>二、学术竞赛的经验</strong></h3><p style=\"text-align: start;\">谈到竞赛后，就要说一下<strong>竞赛的分类</strong>，平时大家参加的竞赛主要分为社会实践类，科技创新类，文体活动类以及其他类型的比赛。其中科技创新类比赛又可以分为论文类，科技发明制作类，创业类以及其他类别。</p><p style=\"text-align: start;\">为了让大家更好地了解和掌握学术竞赛的有关知识，接下来我将主要围绕<strong>我的比赛经历及感受、如何找到自己擅长的竞赛方向、怎样为参加比赛做准备</strong>三个方面展开讲解。</p><p style=\"text-align: start;\"><strong>1.我的比赛经历及感受。</strong></p><p style=\"text-align: start;\">大学四年，自己参加了很多大大小小的比赛。其中令我印象最深刻的是自己第一次参加国家级比赛，2018年自己作为队长参加了全国XXXX竞赛，最终获得了国家级二等奖。<strong>通过这次比赛自己有了很多感受，主要感受如下：</strong></p><p style=\"text-align: start;\">1）当我们首次参加省级、国家级比赛时不要畏惧，因为有些比赛并没有我们想象的那么难，只有自己亲自尝试了才会知道。</p><p style=\"text-align: start;\">2）通过这次比赛，自己意识到申报书的重要性。因为这是自己第一次参加国家级比赛，所以在准备申报材料时特别仔细，反复阅读、修改材料，最后不知道修改了多少遍才完成了作品的申报。</p><p style=\"text-align: start;\">3）当我们在参加比赛的时候不要过度关注比赛的结果，还要在比赛过程中不断地积累经验，这样才有利于今后的比赛。</p><p style=\"text-align: start;\"><strong>2. 如何找到自己擅长的竞赛方向？</strong></p><p style=\"text-align: start;\"><strong>首先，充分了解自己。</strong>如果自己喜欢做实验，并且做的比较好的话，大家以后可以着手准备一些实验类的竞赛；如果大家比较喜欢科研的话，大家可以参加一些科技类的学术竞赛，比如说挑战杯比赛、节能减排比赛，科技创新大赛等；如果大家对软件使用有兴趣，大家可以参加数学建模竞赛，化工设计竞赛等；如果对创业有兴趣，大家可以参加创青春、互联网+、山东省创业计划大赛等，如果大家对高数、物理有兴趣，也可以参加山东省大学生数学竞赛、物理竞赛等。</p><p style=\"text-align: start;\"><strong>其次，充分了解竞赛。</strong>比较常参加的一些科技创新类的竞赛主要有下面这些，当然不仅仅局限于下面这些，还有好多未列举。其中例如：互联网+、挑战杯、创青春、数学建模等对专业没有太多要求，大家都可以参加的比赛。一些专业性较强的竞赛，需要具备一定的专业素养。如果不太确定自己比较擅长哪一方面，那就多去尝试，最后就会知道自己所擅长的领域进而选择相关的竞赛。</p><p style=\"text-align: start;\"><strong>3.怎样为参加比赛做准备？</strong></p><p style=\"text-align: start;\"><strong>1）勇于尝试，无所畏惧。</strong></p><p style=\"text-align: start;\">大家要勇敢迈出第一步，可能第一步比较难，但是当你迈出第一步的时候，你会发现其实学术竞赛可能并没有想象的那么难，当然这并不意味着第一次就有可能成功。</p><p style=\"text-align: start;\">如果是低年级同学的话，可以同自己的学长学姐一起参加比赛，通过这种方式首先能够熟悉整个比赛的流程，其次当自己有疑问时，还可以随时与学长学姐们讨论。自己第一次参加比赛也是通过这种方式。</p><p style=\"text-align: start;\"><strong>2）寻求帮助，从事科研。</strong></p><p style=\"text-align: start;\">如果打算从事科研方面的工作或者想要参加科技类的竞赛的话，可以寻求导师或专业老师的帮助，从而在实验室进行实验研究，为今后比赛做准备。</p><p style=\"text-align: start;\">大家可以去学院网站或者通过其他途径了解到老师的研究方向，选一个自己比较感兴趣的方向，可以通过电话或者微信等方式向老师表明自己的态度，一般来讲老师就会同意，这样的话就有机会从事科研方面的工作了。</p><p style=\"text-align: start;\"><strong>3）找好团队，特长互补。</strong></p><p style=\"text-align: start;\">如果想要参加创业类的比赛，可以找好团队成员组织参加比赛，当然，团队成员的特长一定要互补，比如说有人擅长答辩，有人擅长做ppt，有人擅长文案工作，有人擅长作品制作等。</p><p style=\"text-align: start;\">大家可以通过同学推荐或者自己主动发现一些比较有能力并且想要参加比赛的人，和他们一起组队的话往往得奖的可能性会比较大。</p><p style=\"text-align: start;\"><strong>4、注意细节，积极备赛。</strong></p><p style=\"text-align: start;\">当参与比赛时要做充分的准备，在第一阶段申报材料时，要依据要求逐句修改、力争完美。修改过后，要多和指导老师交流沟通，依据老师的意见继续修改完善作品。</p><p style=\"text-align: start;\">当进入到路演以及答辩环节时，要每个人合理分工、相互配合，多考虑可能涉及到的问题，以防万一。评委老师一般都是比较有资质的专家、教授，他们往往会看重作品的应用前景、项目的核心技术以及作品的创新点，所以大家要多在这些方面下功夫。</p><p style=\"text-align: start;\">我觉得大一的话尽量还是多了解、多尝试，可以先参加一些院级、校级的比赛，积累一下比赛的经验。等到大二自己经验较为充足时，可以去选择性地参加一些较为容易获奖的省级、国家级的比赛。大三的时候就要重点参加含金量比较高的省级、国家级的比赛竞赛，提升自己的能力。大四的话，一般就忙于考研、寻找工作以及毕业设计等，参加比赛的人数相对比较少。</p><h3 style=\"text-align: start;\"><strong>三、学习与推免</strong></h3><p style=\"text-align: start;\"><strong>1.学习方面</strong></p><p style=\"text-align: start;\">步入大学以来，自己比较重视学习，前三学年综测排名在专业200余人中排名第3。可能很多人觉得学习在大学中并没有占据特别重要的一部分，但是我想说的可能你还没有意识到，比如在推免以及评奖评优过程当中，成绩是一个十分重要的指标。</p><p style=\"text-align: start;\"><strong>2.推免方面</strong></p><p style=\"text-align: start;\">今年获得了学校的推免资格，参加并通过了xx大学、哈尔滨工业大学等双一流学校推免生面试。现已推免至xx大学攻读xx方向的研究生。</p><p style=\"text-align: start;\">关于推免我想说两点：</p><p style=\"text-align: start;\">1）如果有推免意愿的话，一定要好好研究推免文件中的每一项要求，并为之做出努力。推免是对学生综合素质的考量，所以说大家要提前做好准备。</p><p style=\"text-align: start;\">2）当自己符合推免条件后，最好可以参加报考学校的暑期夏令营、提前联系导师以及准备好推免复试。</p><p style=\"text-align: start;\"><strong>最后，我想说的是越努力、越幸运。希望大家规划好自己的方向，拥有一个充实而有意义的大学生活，谢谢大家！！！</strong></p>',2,'2024-10-22 13:10:54',0),(7,10,'招募计算机专业的队友啦！！',0,'<p>没有什么严格的要求，但要求肯学，肯沟通，大家一起进步！?我嘞希望做出一个网站，后面参加大挑/计算机设计大赛……欢迎有参赛想法的同学联系我：example@qq.com</p>',1,'2024-10-22 13:25:56',1),(8,10,'测试帖子-02',0,'<p>测试帖子-02的内容</p>',0,'2024-10-22 13:32:24',1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menu`
--

DROP TABLE IF EXISTS `sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES (1,'sys_test_menu'),(2,'sys_update_user_info'),(3,'sys_upload_file'),(4,'sys_grant_admin'),(5,'sys_logout'),(6,'sys_get_user_info'),(7,'sys_add_award_item'),(8,'sys_del_award_item'),(9,'sys_update_award_item'),(10,'sys_get_user_awards'),(11,'sys_add_match_item'),(12,'sys_del_match_item'),(13,'sys_get_all_match'),(14,'sys_get_single_match'),(16,'sys_create_post'),(17,'sys_get_post_details'),(18,'sys_like_post'),(19,'sys_unlike_post'),(20,'sys_get_is_like_post'),(21,'sys_get_public_post_list'),(22,'sys_del_own_post'),(23,'sys_del_public_post'),(24,'sys_update_own_post'),(25,'sys_get_all_post'),(26,'sys_get_all_user'),(27,'sys_ban_user');
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES (1,'super_admin'),(2,'admin'),(3,'user');
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_menu`
--

DROP TABLE IF EXISTS `sys_role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sys_role_menu_sys_menu_id_fk` (`menu_id`),
  KEY `sys_role_menu_sys_role_id_fk` (`role_id`),
  CONSTRAINT `sys_role_menu_sys_menu_id_fk` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`),
  CONSTRAINT `sys_role_menu_sys_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_menu`
--

LOCK TABLES `sys_role_menu` WRITE;
/*!40000 ALTER TABLE `sys_role_menu` DISABLE KEYS */;
INSERT INTO `sys_role_menu` VALUES (1,1,1),(2,2,1),(3,3,1),(4,1,2),(5,2,2),(6,3,2),(7,1,3),(8,2,3),(9,3,3),(10,1,4),(11,1,5),(12,2,5),(13,3,5),(14,1,6),(15,2,6),(16,3,6),(17,1,7),(18,2,7),(19,3,7),(20,1,8),(21,2,8),(22,3,8),(23,1,9),(24,2,9),(25,3,9),(26,1,10),(27,2,10),(28,3,10),(29,1,11),(30,1,12),(31,1,13),(32,2,13),(33,3,13),(34,1,14),(35,2,14),(36,3,14),(37,1,16),(38,2,16),(39,3,16),(40,1,17),(41,2,17),(42,3,17),(43,1,18),(44,2,18),(45,3,18),(46,1,19),(47,2,19),(48,3,19),(49,1,20),(50,2,20),(51,3,20),(52,1,21),(53,2,21),(54,3,21),(55,1,22),(56,2,22),(57,3,22),(58,1,23),(59,2,23),(60,1,24),(61,2,24),(62,3,24),(63,1,25),(64,2,25),(65,1,26),(66,2,26),(67,1,27),(68,2,27);
/*!40000 ALTER TABLE `sys_role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `major` varchar(100) NOT NULL,
  `grade` varchar(20) NOT NULL,
  `avatar` varchar(200) NOT NULL DEFAULT 'https://q9.itc.cn/q_70/images03/20240110/1f984d01360541d3ad28b4d2c0166b1d.jpeg',
  `is_banned` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (10,'outlier','$2b$10$XCuTZLQxKgbMYojvT2R5FOEp9Tlum94RYqIQO5zVGr16jnK8nt83G','test@qq.com','计算机科学与技术','2022级','http://127.0.0.1:3000/images/a269535d5f03a0ceacb501200.png',0),(11,'超级管理员','$2b$10$Px52P6QOpyulkMS9xMW3zeLKTNNa4muv.J6pd6OphD2o3mQZZGUNe','super@test.com','计算机科学与技术','2022级','http://127.0.0.1:3000/images/7ef17db6dae97b7714c469600.jpg',0),(12,'测试账号','$2b$10$Px52P6QOpyulkMS9xMW3zeLKTNNa4muv.J6pd6OphD2o3mQZZGUNe','example@qq.com','软件测试','2030级','https://q9.itc.cn/q_70/images03/20240110/1f984d01360541d3ad28b4d2c0166b1d.jpeg',0);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_role`
--

DROP TABLE IF EXISTS `sys_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sys_user_role_sys_role_id_fk` (`role_id`),
  KEY `sys_user_role_sys_user_id_fk` (`user_id`),
  CONSTRAINT `sys_user_role_sys_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`),
  CONSTRAINT `sys_user_role_sys_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_role`
--

LOCK TABLES `sys_user_role` WRITE;
/*!40000 ALTER TABLE `sys_user_role` DISABLE KEYS */;
INSERT INTO `sys_user_role` VALUES (2,10,3),(3,11,1),(4,11,3),(5,12,3),(6,10,2),(7,12,2);
/*!40000 ALTER TABLE `sys_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_like_post`
--

DROP TABLE IF EXISTS `user_like_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_like_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `is_cancel` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_like_post_post_id_fk` (`post_id`),
  KEY `user_like_post_sys_user_id_fk` (`user_id`),
  CONSTRAINT `user_like_post_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `user_like_post_sys_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_like_post`
--

LOCK TABLES `user_like_post` WRITE;
/*!40000 ALTER TABLE `user_like_post` DISABLE KEYS */;
INSERT INTO `user_like_post` VALUES (1,11,4,0),(2,10,1,0),(3,10,6,0),(4,10,4,1),(5,11,6,0),(6,11,5,0),(7,11,7,0);
/*!40000 ALTER TABLE `user_like_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26 15:26:09
