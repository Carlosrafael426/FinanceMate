import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

function ExportButtons({ transacoes, receitas, despesas, saldo }) {
  
  // Exportar para PDF
  function exportarPDF() {
    const doc = new jsPDF()
    
    // Título
    doc.setFontSize(20)
    doc.setTextColor(31, 41, 55)
    doc.text('Relatório Financeiro', 14, 22)
    
    // Data do relatório
    doc.setFontSize(10)
    doc.setTextColor(107, 114, 128)
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30)
    
    // Resumo
    doc.setFontSize(14)
    doc.setTextColor(31, 41, 55)
    doc.text('Resumo', 14, 45)
    
    doc.setFontSize(11)
    doc.setTextColor(34, 197, 94) // verde
    doc.text(`Receitas: R$ ${receitas.toFixed(2)}`, 14, 55)
    
    doc.setTextColor(239, 68, 68) // vermelho
    doc.text(`Despesas: R$ ${despesas.toFixed(2)}`, 14, 63)
    
    doc.setTextColor(saldo >= 0 ? 34 : 249, saldo >= 0 ? 197 : 115, saldo >= 0 ? 94 : 22)
    doc.text(`Saldo: R$ ${saldo.toFixed(2)}`, 14, 71)
    
    // Tabela de transações
    if (transacoes.length > 0) {
      doc.setFontSize(14)
      doc.setTextColor(31, 41, 55)
      doc.text('Transações', 14, 88)
      
      const dadosTabela = transacoes.map((t) => [
        t.data,
        t.descricao,
        t.categoria,
        t.tipo === 'receita' ? 'Receita' : 'Despesa',
        `R$ ${t.valor.toFixed(2)}`
      ])
      
      autoTable(doc, {
        startY: 93,
        head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
        body: dadosTabela,
        theme: 'striped',
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 50 },
          2: { cellWidth: 35 },
          3: { cellWidth: 25 },
          4: { cellWidth: 30, halign: 'right' }
        }
      })
    }
    
    // Salvar
    doc.save(`relatorio-financeiro-${new Date().toISOString().split('T')[0]}.pdf`)
  }
  
  // Exportar para Excel
  function exportarExcel() {
    // Dados do resumo
    const resumo = [
      ['RELATÓRIO FINANCEIRO'],
      [`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`],
      [],
      ['RESUMO'],
      ['Receitas', `R$ ${receitas.toFixed(2)}`],
      ['Despesas', `R$ ${despesas.toFixed(2)}`],
      ['Saldo', `R$ ${saldo.toFixed(2)}`],
      [],
      ['TRANSAÇÕES'],
      ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']
    ]
    
    // Adicionar transações
    transacoes.forEach((t) => {
      resumo.push([
        t.data,
        t.descricao,
        t.categoria,
        t.tipo === 'receita' ? 'Receita' : 'Despesa',
        t.valor.toFixed(2)
      ])
    })
    
    // Criar workbook e worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(resumo)
    
    // Ajustar largura das colunas
    ws['!cols'] = [
      { wch: 12 },
      { wch: 30 },
      { wch: 15 },
      { wch: 10 },
      { wch: 15 }
    ]
    
    // Adicionar worksheet ao workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório')
    
    // Salvar
    XLSX.writeFile(wb, `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.xlsx`)
  }
  
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={exportarPDF}
        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
      >
        📄 Exportar PDF
      </button>
      
      <button
        onClick={exportarExcel}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
      >
        📊 Exportar Excel
      </button>
    </div>
  )
}

export default ExportButtons