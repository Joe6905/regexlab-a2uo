import React,{useState,useCallback,useEffect}from'react'

function analyzeText(input){
  if(!input.trim())return null;
  const words=input.trim().split(/\\s+/);
  const freq={};
  words.forEach(w=>{const k=w.toLowerCase().replace(/[^a-z]/g,'');if(k)freq[k]=(freq[k]||0)+1;});
  return{words:words.length,chars:input.replace(/\\s/g,'').length,unique:Object.keys(freq).length,top:Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5)};
}

function calcStats(nums){
  if(!nums.length)return null;
  const s=[...nums].sort((a,b)=>a-b),sum=s.reduce((a,b)=>a+b,0);
  return{count:s.length,sum:Math.round(sum*100)/100,mean:Math.round(sum/s.length*100)/100,min:s[0],max:s[s.length-1]};
}

export default function App(){
  const[txt,setTxt]=useState(''),
    [res,setRes]=useState(null),
    [items,setItems]=useState([]),
    [lbl,setLbl]=useState(''),
    [val,setVal]=useState(''),
    [tab,setTab]=useState('text'),
    [sec,setSec]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setSec(s=>s+1),1000);return()=>clearInterval(t);},[]);
  const analyze=useCallback(()=>{if(!txt.trim()){setRes({error:'Enter text'});return;}setRes(analyzeText(txt));},[txt]);
  const addItem=useCallback(()=>{if(!lbl.trim()||!val.trim())return;setItems(p=>[...p,{id:Date.now(),lbl,val:Number(val)}]);setLbl('');setVal('');},[lbl,val]);
  const stats=calcStats(items.map(i=>i.val));
  const S={app:{minHeight:'100vh',background:'#06090e',color:'#c8ddf5',display:'flex',flexDirection:'column'},nav:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 24px',background:'#0e1420',borderBottom:'1px solid #1b2a3d'},main:{flex:1,padding:24,maxWidth:860,margin:'0 auto',width:'100%'},card:{background:'#0e1420',border:'1px solid #1b2a3d',borderRadius:8,padding:18,marginBottom:14},btn:{background:'#6366f1',color:'#fff',border:'none',padding:'9px 18px',borderRadius:6,fontSize:13,fontWeight:700,cursor:'pointer'},inp:{background:'#06090e',border:'1px solid #1b2a3d',borderRadius:6,padding:'9px 12px',color:'#c8ddf5',fontSize:13,outline:'none',width:'100%',marginBottom:8},res:{background:'#06090e',borderRadius:6,padding:12,fontFamily:'monospace',fontSize:12,color:'#22d3ee',whiteSpace:'pre-wrap',minHeight:48}};
  return(<div style={S.app}><nav style={S.nav}><b style={{color:'#6366f1',fontSize:16}}>RegexLab</b><div style={{display:'flex',gap:5}}>{['text','data'].map(t=><button key={t} onClick={()=>setTab(t)} style={{...S.btn,padding:'5px 12px',fontSize:11,...(tab===t?{}:{background:'transparent',border:'1px solid #1b2a3d',color:'#c8ddf5'})}}>\u{1f4bb}{t}</button>)}</div><span style={{fontSize:11,color:'#6888a8'}}>{sec}s</span></nav>
  <main style={S.main}><div style={S.card}><div style={{fontSize:20,fontWeight:800,color:'#6366f1',marginBottom:6}}>RegexLab</div><div style={{fontSize:13,color:'#6888a8'}}>Interactive regex tester with highlights &middot; Easy</div></div>
  {tab==='text'&&<div style={S.card}><h3 style={{marginBottom:12,color:'#22d3ee',fontSize:14}}>Text Processor</h3><textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder='Enter text...' style={{...S.inp,height:80,resize:'vertical'}}/><button onClick={analyze} style={S.btn}>Analyze</button>{res&&<div style={{...S.res,marginTop:10}}>{res.error||Object.entries(res).map(([k,v])=>k+': '+(Array.isArray(v)?v.map(([w,c])=>w+'('+c+')').join(' '):v)).join('\n')}</div>}</div>}
  {tab==='data'&&<div style={S.card}><h3 style={{marginBottom:12,color:'#22d3ee',fontSize:14}}>Data Tracker</h3><div style={{display:'flex',gap:8,marginBottom:10}}><input value={lbl} onChange={e=>setLbl(e.target.value)} placeholder='Label' style={{...S.inp,marginBottom:0,flex:2}} onKeyDown={e=>e.key==='Enter'&&addItem()}/><input value={val} onChange={e=>setVal(e.target.value)} type='number' placeholder='Value' style={{...S.inp,marginBottom:0,flex:1}} onKeyDown={e=>e.key==='Enter'&&addItem()}/><button onClick={addItem} style={{...S.btn,whiteSpace:'nowrap'}}>Add</button></div>{stats&&<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:12}}>{[['Count',stats.count],['Sum',stats.sum],['Mean',stats.mean],['Max',stats.max]].map(([l,v])=><div key={l} style={{background:'#06090e',borderRadius:7,padding:12,textAlign:'center'}}><div style={{fontSize:20,fontWeight:800,color:'#6366f1'}}>{v}</div><div style={{fontSize:10,color:'#6888a8',marginTop:3}}>{l}</div></div>)}</div>}{items.map(i=><div key={i.id} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 10px',background:'#06090e',borderRadius:5,marginBottom:4}}><span style={{flex:1,fontSize:12}}>{i.lbl}</span><span style={{color:'#6366f1',fontWeight:700}}>{i.val}</span><span onClick={()=>setItems(p=>p.filter(x=>x.id!==i.id))} style={{color:'#ff4848',cursor:'pointer'}}>x</span></div>)}{!items.length&&<p style={{color:'#6888a8',fontSize:12}}>No entries yet.</p>}</div>}
  </main><footer style={{textAlign:'center',padding:'20px',borderTop:'1px solid #1b2a3d',fontSize:11,color:'#334d68'}}>Built by NEXUS.AI &middot; RegexLab v1.0</footer></div>);
}