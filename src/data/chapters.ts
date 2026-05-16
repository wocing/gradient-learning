export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'formula'; latex: string }
  | { type: 'highlight'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'example'; title: string; content: string };

export const chapters: Chapter[] = [
  {
    id: 'introduction',
    title: '概念引入',
    subtitle: '从山坡到数学',
    sections: [
      {
        id: 'intro-physical',
        title: '物理背景',
        content: [
          {
            type: 'text',
            content: '想象你站在一座小山的山坡上，有以下信息：山的高度可以用函数 H(x, y) 表示，其中 x 和 y 是你在水平面上的坐标。你想知道往哪个方向走，海拔升高最快？这个"最快上升方向"就是我们要学习的**梯度**。'
          },
          {
            type: 'text',
            content: '梯度概念在物理学、工程学、经济学等领域都有广泛应用。例如：在物理学中，电场强度就是电势的梯度；在机器学习中，梯度下降法是优化算法的核心。'
          },
          {
            type: 'highlight',
            content: '核心问题：\n1. 如何描述"往某个方向走"？（方向向量）\n2. 如何计算"沿某个方向的高度变化率？（方向导数）\n3. 哪个方向变化最快？（梯度）'
          },
          {
            type: 'example',
            title: '山坡实例',
            content: '假设山的高度函数为 H(x, y) = 100 - x² - y²（一座圆顶山）。\n• 在原点 (0, 0)，高度 H = 100，山顶！\n• 在点 (1, 2)，高度 H = 100 - 1 - 4 = 95\n\n山顶处无论往哪个方向走，高度都会下降；而在半山腰，某个方向上升、另一个方向可能下降。'
          }
        ]
      },
      {
        id: 'intro-3d',
        title: '3D 可视化说明',
        content: [
          {
            type: 'text',
            content: '左侧的 3D 图形展示了曲面 z = f(x, y)。我们可以：\n• 旋转视角观察曲面在不同方向的形状\n• 调整曲面上的点 P 的位置\n• 观察该点的梯度向量（橙红色）和方向向量（蓝色）'
          },
          {
            type: 'list',
            items: [
              '黄色球体：表示当前选择的点 P(x, y)',
              '橙红色箭头：从 P 点出发的梯度向量 ∇f',
              '蓝色箭头：从 P 点出发的方向向量 u',
              '曲面颜色：从蓝到青表示高度从低到高'
            ]
          },
          {
            type: 'example',
            title: '可视化实验',
            content: '尝试以下操作：\n1. 将点 P 移到原点 (0, 0)，观察 z = x² + y² 时曲面最低点\n2. 将点 P 移到 (1.5, -1.0)，观察曲面在该点的高度\n3. 旋转视角，从不同角度观察曲面形状'
          }
        ]
      }
    ]
  },
  {
    id: 'directional-derivative',
    title: '方向导数',
    subtitle: '沿任意方向的变化率',
    sections: [
      {
        id: 'dd-definition',
        title: '定义',
        content: [
          {
            type: 'text',
            content: '偏导数只告诉我们沿 x 轴或 y 轴的变化率，但生活中我们需要知道沿任意方向的变化率。例如：在气象学中，我们需要知道风速在任意方向的变化。这就引出了方向导数的概念。'
          },
          {
            type: 'formula',
            latex: '\\frac{\\partial f}{\\partial \\mathbf{l}} = \\lim_{h \\to 0^+} \\frac{f(x_0 + h \\cos\\alpha, y_0 + h \\cos\\beta) - f(x_0, y_0)}{h}'
          },
          {
            type: 'text',
            content: '其中 (cosα, cosβ) 是方向 l 的单位向量。它表示从点 (x₀, y₀) 出发，沿方向 l 的瞬时变化率。'
          },
          {
            type: 'example',
            title: '例题：计算方向导数',
            content: '设 f(x, y) = x² + y²，求在点 (1, 0) 处，沿方向 u = (1/√2, 1/√2) 的方向导数。\n\n解：\n• ∂f/∂x = 2x, ∂f/∂y = 2y\n• 在 (1, 0) 处：∂f/∂x = 2, ∂f/∂y = 0\n• ∂f/∂u = 2 × (1/√2) + 0 × (1/√2) = √2 ≈ 1.414\n\n这意味着沿该方向走，函数值以约 1.414 的速率增加。'
          }
        ]
      },
      {
        id: 'dd-formula',
        title: '计算公式',
        content: [
          {
            type: 'formula',
            latex: '\\frac{\\partial f}{\\partial \\mathbf{l}} = \\frac{\\partial f}{\\partial x} \\cos\\alpha + \\frac{\\partial f}{\\partial y} \\cos\\beta'
          },
          {
            type: 'text',
            content: '这个公式将方向导数与偏导数联系起来。我们只需要知道：\n• 函数在 x、y 方向的偏导数\n• 方向向量的单位表示'
          },
          {
            type: 'highlight',
            content: '方向导数 = 偏导数与方向余弦的点积'
          },
          {
            type: 'example',
            title: '例题：使用公式',
            content: '设 f(x, y) = 3x + 2y，求在点 (2, 1) 处，沿方向 v = (3, 4) 的方向导数。\n\n解：\n• 先求单位向量：|v| = 5，所以 u = (3/5, 4/5)\n• 偏导数：∂f/∂x = 3, ∂f/∂y = 2\n• 方向余弦：cosα = 3/5, cosβ = 4/5\n• ∂f/∂u = 3 × (3/5) + 2 × (4/5) = 17/5 = 3.4'
          }
        ]
      },
      {
        id: 'dd-interpretation',
        title: '几何意义',
        content: [
          {
            type: 'text',
            content: '方向导数的几何意义是：曲面在给定方向上的切片曲线的斜率。可以把它想象成用一把垂直的刀，沿着某个方向切下去，曲面上出现一条曲线，这条曲线的斜率就是方向导数。'
          },
          {
            type: 'formula',
            latex: '\\frac{\\partial f}{\\partial \\mathbf{l}} = |\\nabla f| \\cos\\theta'
          },
          {
            type: 'text',
            content: '其中 θ 是梯度方向与给定方向之间的夹角。这个公式揭示了方向导数与梯度的关系。'
          },
          {
            type: 'example',
            title: '几何解释',
            content: '对于 f(x, y) = x² + y² 在点 (1, 1)：\n• 梯度 ∇f = (2, 2)，方向指向 (1, 1)\n• |∇f| = 2√2 ≈ 2.828\n\n现在分析不同方向：\n• θ = 0°（沿梯度方向）：∂f/∂l = 2√2（最大）\n• θ = 45°：∂f/∂l = 2√2 × cos45° = 2\n• θ = 90°：∂f/∂l = 0\n• θ = 180°：∂f/∂l = -2√2（最小）'
          }
        ]
      }
    ]
  },
  {
    id: 'gradient',
    title: '梯度',
    subtitle: '最速上升方向',
    sections: [
      {
        id: 'grad-definition',
        title: '定义',
        content: [
          {
            type: 'text',
            content: '梯度是函数在某一点变化率最大的方向及其大小。它是一个向量，由所有偏导数组成。'
          },
          {
            type: 'formula',
            latex: '\\nabla f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right)'
          },
          {
            type: 'text',
            content: '读作"del f"或"nabla f"。在三维情况下，梯度还包含 ∂f/∂z 分量。'
          },
          {
            type: 'example',
            title: '例题：求梯度',
            content: '求 f(x, y) = x²y + sin(x) 在点 (1, 2) 的梯度。\n\n解：\n• ∂f/∂x = 2xy + cos(x)\n• ∂f/∂y = x²\n• 在 (1, 2)：∂f/∂x = 2×1×2 + cos(1) = 4 + 0.540 = 4.540\n• 在 (1, 2)：∂f/∂y = 1² = 1\n\n所以 ∇f(1, 2) = (4.540, 1)'
          }
        ]
      },
      {
        id: 'grad-theorem',
        title: '核心定理',
        content: [
          {
            type: 'formula',
            latex: '\\frac{\\partial f}{\\partial \\mathbf{l}} = \\nabla f \\cdot \\mathbf{u} = |\\nabla f| \\cos\\theta'
          },
          {
            type: 'text',
            content: '这个公式告诉我们：任意方向的方向导数，等于梯度与该方向单位向量的点积。'
          },
          {
            type: 'highlight',
            content: '重要结论：\n• 当 θ = 0°（沿梯度方向）：方向导数最大 = |∇f|\n• 当 θ = 180°（逆梯度方向）：方向导数最小 = -|∇f|\n• 当 θ = 90°（垂直梯度方向）：方向导数为 0'
          },
          {
            type: 'example',
            title: '例题：应用定理',
            content: '对于 f(x, y) = x² + y²，在点 (2, 1)：\n• ∇f = (2x, 2y) = (4, 2)\n• |∇f| = √(16 + 4) = √20 ≈ 4.472\n\n沿梯度方向：∂f/∂l = 4.472\n沿反梯度方向：∂f/∂l = -4.472\n沿垂直方向：∂f/∂l = 0'
          }
        ]
      },
      {
        id: 'grad-properties',
        title: '梯度的重要性质',
        content: [
          {
            type: 'list',
            items: [
              '梯度指向函数增长最快的方向',
              '梯度的模长是最大方向导数的值',
              '梯度总是与等高线垂直',
              '在尖点或不可微点，梯度可能不存在'
            ]
          },
          {
            type: 'example',
            title: '等高线实例',
            content: '对于 f(x, y) = x² + y²，等高线是圆 x² + y² = c。\n• 在点 (1, 1)，梯度 ∇f = (2, 2)\n• 该点的等高线是圆 x² + y² = 2\n• 梯度 (2, 2) 指向半径增大的方向，即指向圆外\n• 这与"梯度垂直于等高线"一致\n\n几何上，梯度指向函数值增长最快的方向，也就是最"陡峭"的方向。'
          }
        ]
      }
    ]
  },
  {
    id: 'applications',
    title: '梯度应用',
    subtitle: '最速上升与下降',
    sections: [
      {
        id: 'app-steepest',
        title: '最速方向',
        content: [
          {
            type: 'text',
            content: '梯度最重要的应用之一是确定函数变化最快的方向。这在优化问题中尤为重要。'
          },
          {
            type: 'highlight',
            content: '最速上升方向：∇f 方向\n最速下降方向：-∇f 方向'
          },
          {
            type: 'text',
            content: '在右侧调整方向向量，使其与梯度方向（橙红色箭头）平行或反向，观察方向导数的变化。'
          },
          {
            type: 'example',
            title: '爬山算法',
            content: '想象你要找到山的最高点：\n1. 从某点开始，计算梯度\n2. 沿梯度方向走一步（上升最快）\n3. 重复直到梯度接近零\n\n这就是"梯度上升法"，用于求最大值。\n\n如果要求最小值（如找到山谷），则沿负梯度方向下降，称为"梯度下降法"。'
          }
        ]
      },
      {
        id: 'app-examples',
        title: '实际应用场景',
        content: [
          {
            type: 'list',
            items: [
              '机器学习：用梯度下降法最小化损失函数',
              '物理学：电场强度是电势的负梯度',
              '气象学：风从高压指向低压，即梯度的反方向',
              '图像处理：边缘检测利用梯度寻找强度突变'
            ]
          },
          {
            type: 'example',
            title: '机器学习中的应用',
            content: '在训练神经网络时：\n• 损失函数 L(w) 衡量预测与真实值的差距\n• 目标是找到使 L(w) 最小的权重 w\n• 梯度下降：w ← w - η ∇L(w)\n• 其中 η 是学习率，控制每步走多远\n\n直观理解：沿着损失函数曲面向下走，每步都选最陡的下山方向，直到到达谷底。'
          }
        ]
      },
      {
        id: 'app-exercise',
        title: '动手实验',
        content: [
          {
            type: 'text',
            content: '利用左侧的可视化工具进行实验：\n1. 选择不同函数，观察梯度向量的变化\n2. 改变点 P 的位置，观察梯度如何随位置变化\n3. 调整方向向量角度，观察方向导数的正负变化'
          },
          {
            type: 'example',
            title: '实验记录',
            content: '对于 z = x² + y² 在点 (1, 0)：\n• 梯度 ∇f = (2, 0)\n• 沿 x 轴正方向：方向导数 = 2\n• 沿 x 轴负方向：方向导数 = -2\n• 沿 y 轴方向：方向导数 = 0\n\n尝试将方向向量调整到 θ = 0°，观察方向导数达到最大值。'
          }
        ]
      }
    ]
  },
  {
    id: 'summary',
    title: '总结',
    subtitle: '核心要点回顾',
    sections: [
      {
        id: 'summary-key',
        title: '关键公式',
        content: [
          {
            type: 'formula',
            latex: '\\text{方向导数：} \\frac{\\partial f}{\\partial \\mathbf{l}} = \\nabla f \\cdot \\mathbf{u}'
          },
          {
            type: 'formula',
            latex: '\\text{梯度：} \\nabla f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right)'
          },
          {
            type: 'formula',
            latex: '\\text{最大方向导数：} |\\nabla f|'
          },
          {
            type: 'example',
            title: '综合例题',
            content: '设 f(x, y) = 2x² + 3y²，求：\n\n1. 梯度：∇f = (4x, 6y)\n\n2. 在点 (1, 2) 的梯度：∇f(1,2) = (4, 12)\n\n3. 在该点沿方向 u = (3, 4) 的方向导数：\n   • |u| = 5，单位向量 u = (3/5, 4/5)\n   • ∂f/∂u = 4×(3/5) + 12×(4/5) = 60/5 = 12'
          }
        ]
      },
      {
        id: 'summary-flow',
        title: '知识脉络',
        content: [
          {
            type: 'text',
            content: '偏导数 → 方向导数 → 梯度\n\n偏导数只能描述 x、y 两个特定方向的变化率；\n方向导数推广到任意方向；\n梯度则是所有方向导数中最特殊的那个——变化最快的方向。'
          },
          {
            type: 'highlight',
            content: '学习建议：结合左侧 3D 可视化，多动手调整参数，体会公式背后的几何直觉。'
          },
          {
            type: 'example',
            title: '学习检查清单',
            content: '完成以下任务，检验学习效果：\n\n□ 能说出方向导数与偏导数的区别\n□ 能写出方向导数的计算公式\n□ 能解释梯度与方向导数的关系\n□ 能判断方向导数何时最大、何时最小\n□ 能在 3D 可视化中找到梯度方向\n\n如有困难，回顾对应小节或调整参数观察变化。'
          }
        ]
      }
    ]
  }
];